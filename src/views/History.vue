<template>
	<div class="services">
		<template v-for="service in historyServices">
			<v-card>
				<div class="card">
					<div class="card-text">
						<span class="mdi mdi-account"></span>
						<div class="card-inner1">
							<p class="title">{{ service.authorId.name }}</p>
							<p class="up-title">{{ service.service.name }}</p>
							<p class="up-title">{{ service.date }} | {{ service.time }}</p>
							<p class="title">{{ service.service.price }} ₽</p>
						</div>
					</div>
				</div>
			</v-card>
		</template>
	</div>
</template>

<script>
import { authMe } from '../api/user.js';
import { getServicesDateByUser } from '../api/service.js'

export default {
	name: 'History',
	computed: {
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
	},
	methods: {
		getServices() {
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
.services {
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
.card-text {
	display: flex;
	gap: 10px;
	align-items: center;
}
.card {
	display: flex;
	align-items: center;
	padding: 10px 40px;
	justify-content: space-between;
}
.card-inner1 {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}

span {
	color: #fff;
	font-size: 40px;
}
.title {
	font-size: large;
	color: #2196F3 !important;
}
.my-services {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.err span{
	color: rgb(207,102,121);
}
</style>