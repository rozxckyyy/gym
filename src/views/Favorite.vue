<template>
<div class="menu">
	<template v-for="coache in coachesFavorite">
		<v-card>
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
		</v-card>
	</template>
</div>
</template>

<script>
import { getFavoriteCoach, removeFavoriteCoach } from '../api/user.js';
import { authMe } from '../api/user.js';

export default {
	name: "Favorite",
	computed: {
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
		getFavorite() {
			getFavoriteCoach({_id: this.user._id}).then((res) => {
				this.$store.dispatch('saveFavorite', res.data)
			})
		},
		addTo(coach) {
			this.$store.dispatch('saveSelectedCoach', coach)
			this.$router.push('/menu/services/coaches/service')
		},
		isAuth() {
			if (!localStorage.getItem('token')) {
				this.$router.push('/login');
			} else {
				authMe().then((res) => {
					this.$store.dispatch('saveUser', res.data)
					this.getFavorite()
				})
			}
		},
		deliteFavorite(coach) { 
			removeFavoriteCoach({_id: coach._id}).then((res) => {
				this.$store.dispatch('saveRemoveFavorite', res.data)
			})
		},
	},
	created() {
		this.isAuth()
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