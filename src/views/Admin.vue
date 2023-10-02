<template>
	<v-card>
		<v-tabs v-model="tab" bg-color="transparent">
			<v-tab value="one">Роли</v-tab>
			<v-tab value="two">Управление рангами</v-tab>
			<v-tab value="three">Изменение тренировок</v-tab>
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
					Three
				</v-window-item>
			</v-window>
		</v-card-text>
	</v-card>
</template>

<script>
import { getAllUsersAdmin, upRoleAdmin, downRoleAdmin, getAllUsersRangAdmin, upRangAdmin, downRangAdmin } from '../api/user.js'

export default {
	name: "Admin",
	data() {
		return {
			tab: null,
			roleMin: 'user',
			roleMax: 'coach',
			rangMin: null,
			rangMax: 'Старший тренер'
		}
	},
	computed: {
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
		}
	},
	created() {
		this.getAllUsers()
		this.getAllUsersRang()
	}
}
</script>

<style lang="scss" scoped>
.item {
	display: flex;
	justify-content: space-between;
	gap: 15px;
}

span {
	color: #fff;
	font-size: 20px;
}

.btns {
	display: flex;
}
</style>