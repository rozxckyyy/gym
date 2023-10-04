<template>
	<div class="menu">
		<v-card v-if="coachesFavorite?.length > 0">
			<v-card-title>
				Избранное
			</v-card-title>
			<template v-for="coache in coachesFavorite">
				<div class="card">
					<div class="card-text">
						<span class="mdi mdi-account"></span>
						<div class="card-inner">
							<p class="up-title">{{ coache.coach.rang }}</p>
							<p class="title">{{ coache.coach.name }}</p>
						</div>
					</div>
					<div class="btns">
						<v-btn @click="addTo(coache)" variant="plain">
							<span class="mdi mdi-plus-circle-outline"></span>
						</v-btn>
						<v-btn @click="deliteFavorite(coache)" variant="plain">
							<span class="mdi mdi-heart-off-outline"></span>
						</v-btn>
					</div>
				</div>
			</template>
		</v-card>
		<template v-for="coache in coaches">
			<v-card>
				<div class="card">
					<div class="card-text">
						<span class="mdi mdi-account"></span>
						<div class="card-inner">
							<p class="up-title">{{ coache.rang }}</p>
							<p class="title">{{ coache.name }}</p>
						</div>
					</div>
					<div class="btns">
						<v-btn @click="addTo(coache)" variant="plain">
							<span class="mdi mdi-plus-circle-outline"></span>
						</v-btn>
						<v-btn @click="toFavorite(coache)" variant="plain">
							<span class="mdi mdi-heart-outline"></span>
						</v-btn>
					</div>
				</div>
			</v-card>
		</template>
	</div>
 </template>
 
 <script>
import Card from '../components/Card.vue';
import { getAllCoach, addFavoriteCoach, getFavoriteCoach, removeFavoriteCoach } from '../api/user.js';
import { authMe } from '../api/user.js';
 
 export default {
	name: 'Coaches',
	components: { 
	  Card
	},
	computed: {
		coaches: {
			get() {
				return this.$store.getters.getCoachAll;
			},
			set(value) {
				return this.$store.dispatch('saveCoachAll', value)
			}
		},
		user: {
			get() {
				return this.$store.getters.getUser;
			},
			set(value) {
				return this.$store.dispatch('saveUser', value)
			}
		},
		coachesFavorite: {
			get() {
				return this.$store.getters.getFavorite;
			},
			set(value) {
				return this.$store.dispatch('saveFavorite', value)
			}
		},
	},
	methods: {
		getCoach() {
			getAllCoach().then((res) => {
				this.$store.dispatch('saveCoachAll', res.data)
			})
		},
		getFavorite() {
			getFavoriteCoach({_id: this.user._id}).then((res) => {
				this.$store.dispatch('saveFavorite', res.data)
			})
		},
		addTo(coach) {
			this.$store.dispatch('saveSelectedCoach', coach)
			this.$router.push('/menu/services/coaches/service')
		},
		toFavorite(coach) { 
			addFavoriteCoach({user: this.user, coach: coach}).then((res) => {
				this.$store.dispatch('saveAddFavorite', res.data)
			})
		},
		deliteFavorite(coach) { 
			removeFavoriteCoach({_id: coach._id}).then((res) => {
				this.$store.dispatch('saveRemoveFavorite', res.data)
			})
		},
		isAuth() {
			if (!localStorage.getItem('token')) {
				this.$router.push('/login');
			} else {
				authMe().then((res) => {
					this.$store.dispatch('saveUser', res.data)
					this.getFavorite()
					this.getCoach()
				})
			}
		}
	},
	created() {
		this.isAuth();
	}
 }
 </script>
 
 <style lang="scss" scoped>
 .menu {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
 }
.card {
	display: flex;
	justify-content: space-between;
	padding: 10px 40px;
	align-items: center;
}
.card-inner {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
span {
	color: #fff;
	font-size: 40px;
}
.card-text {
	display: flex;
	gap: 10px;
	align-items: center;
}
.btns {
	display: flex;
	gap: 10px;
}
.title {
	font-size: large;
	color: #2196F3 !important;
}
 </style>
 