<template>
	<div class="menu">
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
						<v-btn @click="addFavorite(coache)" variant="plain">
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
 import { getAllCoach } from '../api/user.js';
 
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
		}
	},
	methods: {
		getCoach() {
			getAllCoach().then((res) => {
				this.$store.dispatch('saveCoachAll', res.data)
			})
		},
		addTo(coach) {
			this.$store.dispatch('saveSelectedCoach', coach)
			this.$router.push('/menu/services/coaches/service')
		}
	},
	created() {
		this.getCoach();
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
 