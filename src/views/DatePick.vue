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
		<template v-if="isDiscount">
			<div class="discount">
				<v-alert title="Важно" text="К данной услуге будет применена скидка 20%" type="success" variant="outlined">
				</v-alert>
			</div>
		</template>
	</div>
</template>

<script>
import { getServicesDateUser, signUpToService, getServicesDateByUser, signUpToServiceDiscount} from '../api/service.js'
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
		historyServices: {
			get() {
				return this.$store.getters.getMyHistoryService;
			},
			set(value) {
				return this.$store.dispatch('saveMyHistoryService', value)
			}
		},
		isDiscount() {
			if (this.historyServices.length === 0) return false
			else if (this.historyServices.length % 2 === 0) return true
			else return false
		},
	},
	methods: {
		getServices() {
			if (this.coacheSelected?.coach?._id && this.serviceSelected._id) {
				getServicesDateUser({authorId: this.coacheSelected.coach._id, serviceId: this.serviceSelected._id}).then((res) => {
					this.$store.dispatch('saveServicesDateAll', res.data)
				})
			} else if (this.coacheSelected._id && this.serviceSelected._id) {
				getServicesDateUser({authorId: this.coacheSelected._id, serviceId: this.serviceSelected._id}).then((res) => {
					this.$store.dispatch('saveServicesDateAll', res.data)
				})
			} else {
				this.$router.push('/menu/services/coaches')
			}
		},
		signUp() {
			if (this.isDiscount) {
				signUpToServiceDiscount({serviceId: this.selectedDate, userId: this.user._id, price: this.serviceSelected.price}).then((res) => {
					this.$router.push('/profile/history')
				})
			} else {
				signUpToService({serviceId: this.selectedDate, userId: this.user._id}).then((res) => {
					this.$router.push('/profile/history')
				})
			}
			
		},
		itemProps(item) {
			return {
				title: item.date,
				subtitle: item.time
			}
		},
		getServicesHistory() {
			getServicesDateByUser({userId: this.user._id}).then((res) => {
				this.$store.dispatch('saveMyHistoryService', res.data)
			})
		},
		isAuth() {
			if (!localStorage.getItem('token')) {
				this.$router.push('/login');
			} else {
				authMe().then((res) => {
					this.$store.dispatch('saveUser', res.data)
					this.getServices()
					this.getServicesHistory()
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
.discount {
	text-align: left;
}
.card-inner {
    display: flex;
    flex-direction: column;
}
</style>