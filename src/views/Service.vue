<template>
	<div class="menu">
		<template v-for="service in services" v-if="services.length > 0">
			<v-card>
				<div class="card">
					<div class="card-text">
						<p class="title">{{service.name}}</p>
						<p class="text">{{service.info}}</p>
						<p class="price">{{service.price}} ₽</p>
					</div>
					<div class="btns">
						<v-btn @click="addTo(service)" variant="plain">
							<span class="mdi mdi-plus-circle-outline"></span>
						</v-btn>
					</div>
				</div>
			</v-card>
		</template>
		<template v-else>
			<v-alert
			title="У выбранного тренера пока еще нет услуг..."
			type="info"
			variant="outlined"
			></v-alert>
		</template>
	</div>
</template>

<script>
import { ServicesByCoach } from '../api/service.js'

export default {
	name: "Service",
	computed: {
		coacheSelected: {
			get() {
				return this.$store.getters.getSelectedCoach;
			},
			set(value) {
				return this.$store.dispatch('saveSelectedCoach', value)
			}
		},
		services: {
			get() {
				return this.$store.getters.getServicesAll;
			},
			set(value) {
				return this.$store.dispatch('saveServicesAll', value)
			}
		},
	},
	methods: {
		getServicesByCoach() {
			if (this.coacheSelected?._id) {
				ServicesByCoach({id: this.coacheSelected._id}).then((res) => {
					this.$store.dispatch('saveServicesAll', res.data)
				})
			} else {
				this.$router.push('/menu/services/coaches')
			}
		},
		addTo(service) {
			this.$store.dispatch('saveServicesSelected', service)
			this.$router.push('/menu/services/coaches/service/date-pick')
		}
	},
	created(){
		this.getServicesByCoach()
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
	flex-direction: column;
	gap: 10px;
	align-items: start;
}
.btns {
	display: flex;
	gap: 10px;
}
.title {
	font-size: large;
	color: #2196F3 !important;
}
.price {
	font-size: medium;
	color: #2196F3 !important;
}
</style>

