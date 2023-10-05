<template>
	<v-card class="menu">
		<v-tabs v-model="tab" bg-color="transparent">
			<v-tab value="one">Роли</v-tab>
			<v-tab value="two">Управление рангами</v-tab>
			<v-tab value="three">Изменение услуг</v-tab>
			<v-tab value="four">Изменение расписания услуг</v-tab>
		</v-tabs>

		<v-card-text>
			<v-window v-model="tab">
				<v-window-item value="one">
					<v-table>
						<thead>
							<tr>
								<th>email</th>
								<th>имя</th>
								<th>тип роли</th>
								<th>действия</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(user) in users" :key="user.email">
								<td>{{ user.email }}</td>
								<td>{{ user.name }}</td>
								<td>{{ user.type }}</td>
								<td>
									<div class="btns">
										<template v-if="user.type !== roleMin">
											<v-btn variant="plain" @click="roleDown(user._id)">
												<span class="mdi mdi-arrow-down"></span>
											</v-btn>
										</template>
										<template v-if="user.type !== roleMax">
											<v-btn variant="plain" @click="roleUp(user._id)">
												<span class="mdi mdi-arrow-up"></span>
											</v-btn>
										</template>
									</div>
								</td>
							</tr>
						</tbody>
					</v-table>
				</v-window-item>

				<v-window-item value="two">
					<v-table>
						<thead>
							<tr>
								<th>email</th>
								<th>имя</th>
								<th>ранг</th>
								<th>действия</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(user) in usersRangs" :key="user.email">
								<td>{{ user.email }}</td>
								<td>{{ user.name }}</td>
								<td>{{ user.rang }}</td>
								<td>
									<div class="btns">
										<template v-if="user.rang !== rangMin">
											<v-btn variant="plain" @click="rangDown(user._id)">
												<span class="mdi mdi-arrow-down"></span>
											</v-btn>
										</template>
										<template v-if="user.rang !== rangMax">
											<v-btn variant="plain" @click="rangUp(user._id)">
												<span class="mdi mdi-arrow-up"></span>
											</v-btn>
										</template>
									</div>
								</td>
							</tr>
						</tbody>
					</v-table>
				</v-window-item>

				<v-window-item value="three">
					<div>
						<v-select
						v-model="selectedService"
						label="Выберите услугу"
						no-data-text="Услуги не загружены"
						:items="services"
						:return-object="true"
						item-title="name"
						variant="outlined">
						</v-select>
						<div>
							<v-text-field v-model="name" clearable placeholder="Название услуги" variant="outlined"></v-text-field>
							<v-textarea v-model="info" rows="10" row-height="15" :rules="infoRules" counter clearable placeholder="Описание услуги" variant="outlined"></v-textarea>
							<v-text-field v-model="price" clearable placeholder="Цена" variant="outlined"></v-text-field>
						</div>
						<v-btn
						@click="editSelectedService"
						:loading="loading"
						:disabled="!rules"
						block
						color="blue"
						size="large"
						variant="tonal">
						Изменить услугу
						</v-btn>
					</div>
				</v-window-item>

				<v-window-item value="four">
					<div>
						<div class="item-service">
							<v-item-group mandatory v-model="selectedServiceDate">
								<v-row>
									<v-col
									v-for="service in servicesDate">
									<v-item v-slot="{isSelected, toggle}">
										<v-card
										:class="isSelected ? 'text-blue' : ''"
										class="d-flex align-center"
										@click="toggle"
										dark>
										<v-scroll-y-transition>
											<div class="text-h4 flex-grow-1 text-center">
												<p>{{ service.service.name }}</p>
												<p>{{ service.date }}</p>
												<p>{{ service.time }}</p>
											</div>
										</v-scroll-y-transition>
										</v-card>
									</v-item>
									</v-col>
								</v-row>
							</v-item-group>
						</div>
						<v-select
						v-model="selectedTime"
						label="Выберите доступное время"
						:items="['10:00','12:00','14:00','16:00','18:00','20:00']"
						variant="outlined">
						</v-select>
						<v-text-field
						v-model="selectedDate"
						type="date"
						variant="outlined"
						density="compact">
						</v-text-field>
						<v-btn
						@click="editSelectedServiceDate"
						:loading="loading"
						:disabled="!rules2"
						block
						color="blue"
						size="large"
						variant="tonal">
						Добавить услугу
						</v-btn>
					</div>
				</v-window-item>
			</v-window>
		</v-card-text>
	</v-card>
</template>

<script>
import { getAllUsersAdmin, upRoleAdmin, downRoleAdmin, getAllUsersRangAdmin, upRangAdmin, downRangAdmin, authMe } from '../api/user.js'
import { getAllServices, editService, getAllServicesDate, editServiceDate } from '../api/service.js'

export default {
	name: "Admin",
	data() {
		return {
			tab: null,
			roleMin: 'user',
			roleMax: 'coach',
			rangMin: null,
			rangMax: 'Старший тренер',
			loading: false,
			name: '',
			info: '',
			price: '',
			infoRules: [v => v.length <= 250 || 'Максимальная кол-во символов 250'],
			selectedService: '',
			selectedDate: '',
			selectedTime: '',
			selectedServiceDate: '',
		}
	},
	computed: {
		user: {
			get() {
				return this.$store.getters.getUser;
			},
			set(value) {
				return this.$store.dispatch('saveUser', value)
			}
		},
		users: {
			get() {
				return this.$store.getters.getUsersAdmin;
			},
			set(value) {
				return this.$store.dispatch('saveUsersAdmin', value)
			}
		},
		usersRangs: {
			get() {
				return this.$store.getters.getUsersRangAdmin;
			},
			set(value) {
				return this.$store.dispatch('saveUsersRangAdmin', value)
			}
		},
		services: {
			get() {
				return this.$store.getters.getServices; 
			},
			set(value) {
				return this.$store.dispatch('saveServices', value)
			}
		},
		servicesDate: {
			get() {
				return this.$store.getters.getServicesDate; 
			},
			set(value) {
				return this.$store.dispatch('saveServicesDate', value)
			}
		},
		rules() {
			return (this.infoRules && this.name?.length > 0 && this.price?.length > 0 && this.selectedService)
		},
		rules2() {
			return (this.selectedDate && this.selectedTime)
		}
	},
	methods: {
		roleUp(id) {
			upRoleAdmin({ _id: id }).then((res) => {
				this.$store.dispatch('saveUserUpdateType', res.data)
			})
		},
		roleDown(id) {
			downRoleAdmin({ _id: id }).then((res) => {
				this.$store.dispatch('saveUserUpdateType', res.data)
			})
		},
		rangUp(id) {
			upRangAdmin({ _id: id }).then((res) => {
				this.$store.dispatch('saveCreateUserUpdateRang', res.data)
			})
		},
		rangDown(id) {
			downRangAdmin({ _id: id }).then((res) => {
				this.$store.dispatch('saveDelUserUpdateRang', res.data)
			})
		},
		getAllUsers() {
			getAllUsersAdmin().then((res) => {
				this.$store.dispatch('saveUsersAdmin', res.data)
			})
		},
		getAllUsersRang() {
			getAllUsersRangAdmin().then((res) => {
				this.$store.dispatch('saveUsersRangAdmin', res.data)
			})
		},
		getServices() {
			getAllServices().then((res) => {
				this.$store.dispatch('saveServices', res.data)
			})
		},
		getServicesDate() {
			getAllServicesDate().then((res) => {
				this.$store.dispatch('saveServicesDate', res.data)
			})
		},
		editSelectedServiceDate() { 
			editServiceDate({_id: this.servicesDate[this.selectedServiceDate]._id, time: this.selectedTime, date: this.selectedDate,
								 authorId: this.servicesDate[this.selectedServiceDate].authorId, service: this.servicesDate[this.selectedServiceDate].service._id}).then((res) => {
				this.$store.dispatch('saveEditServiceDate', res.data)
			})
		},
		editSelectedService() {
			editService({_id: this.selectedService, name: this.name, info: this.info, price: this.price, authorId: this.selectedService.authorId}).then((res) => {
				this.$store.dispatch('saveEditService', res.data)
			})
		},
		isAuth() {
			if (!localStorage.getItem('token')) {
				this.$router.push('/login');
			} else if (this.user.type !== 'admin' && localStorage.getItem('token')) {
				this.$router.push('/menu');
			} else if (this.user.type === 'admin' && localStorage.getItem('token')) {
				authMe().then((res) => {
					this.$store.dispatch('saveUser', res.data)
					this.getAllUsers()
					this.getAllUsersRang()
					this.getServices()
					this.getServicesDate()
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
.item-service {
	padding: 20px;
}
.menu {
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
}
.item {
	display: flex;
	justify-content: space-between;
	gap: 15px;
}

span {
	color: #fff;
	font-size: 20px;
}
.text-blue {
   color: #2196F3 !important;
}
.btns {
	display: flex;
}
</style>