<template>
	<div class="service">
		<v-card class="card-padd">
			<div class="card-inner">
					<v-select
					v-model="selectedDate"
					label="Выберите дату и время"
					no-data-text="Расписания по этой услуге заполнено или его еще нет"
					:items="serviceDate"
					:item-props="itemProps"
					item-value="_id"
					variant="outlined">
					</v-select>
					<v-btn
					:disabled="!selectedDate"
					@click="signUp"
					block
					color="blue"
					size="large"
					variant="tonal">
						Записаться
					</v-btn>
			</div>
		</v-card>
	</div>
</template>

<script>
import { getServicesDateUser, signUpToService} from '../api/service.js'
import { authMe } from '../api/user.js';

export default {
	name: "DatePick",
	data() {
		return {
			selectedDate: '',
		}
	},
	computed: {
		coacheSelected: {
			get() {
				return this.$store.getters.getSelectedCoach;
			},
			set(value) {
				return this.$store.dispatch('saveSelectedCoach', value)
			}
		},
		serviceSelected: {
			get() {
				return this.$store.getters.getServicesSelected;
			},
			set(value) {
				return this.$store.dispatch('saveServicesSelected', value)
			}
		},
		serviceDate: {
			get() {
				return this.$store.getters.getServicesDateAll;
			},
			set(value) {
				return this.$store.dispatch('saveServicesDateAll', value)
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
	},
	methods: {
		getServices() {
			if (this.coacheSelected?._id && this.serviceSelected?._id) {
				getServicesDateUser({authorId: this.coacheSelected._id, serviceId: this.serviceSelected._id}).then((res) => {
					this.$store.dispatch('saveServicesDateAll', res.data)
				})
			} else {
				this.$router.push('/menu/services/coaches')
			}
		},
		signUp() {
			signUpToService({serviceId: this.selectedDate, userId: this.user._id}).then((res) => {
				console.log(res.data)
			})
		},
		itemProps(item) {
			return {
				title: item.date,
				subtitle: item.time
			}
		},
		isAuth() {
			if (!localStorage.getItem('token')) {
				this.$router.push('/login');
			} else {
				authMe().then((res) => {
					this.$store.dispatch('saveUser', res.data)
					this.getServices()
				})
			}
		}
	},
	created() {
		this.isAuth()
	}
}
</script>

<style lang="scss" scoped>
.service {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
}
.card-padd {
    width: 100%;
    padding: 40px 20px !important;
}
.card-inner {
    display: flex;
    flex-direction: column;
}
</style>