<template>
	<div class="service">
		<v-card class="card-padd"> 
			<v-card-title>Новая услуга</v-card-title>
			<div class="card-inner">
				<div>
					<v-text-field v-model="name" clearable placeholder="Название услуги" variant="outlined"></v-text-field>
					<v-textarea v-model="info" rows="10" row-height="15" :rules="infoRules" counter clearable placeholder="Описание услуги" variant="outlined"></v-textarea>
					<v-text-field v-model="price" clearable placeholder="Цена" variant="outlined"></v-text-field>
				</div>
				<v-btn
				:loading="loading"
				:disabled="!rules"
				block
				color="blue"
				size="large"
				variant="tonal"
				@click="addService">
				Добавить услугу
				</v-btn>
			</div>
		</v-card>

		<div class="my-services">
			<template v-for="service in services">
				<v-card>
					<div class="card">
						<div class="card-text">
							<span class="mdi mdi-account"></span>
							<div class="card-inner1">
								<p class="title">{{ service.name }}</p>
								<p class="up-title">{{ service.info }}</p>
								<p class="title">{{ service.price }}</p>
							</div>
						</div>
						<v-btn @click="delService(service._id)" variant="plain" class="err">
							<span class="mdi mdi-delete"></span>
						</v-btn>
					</div>
				</v-card>
			</template>
		</div>
	</div>
</template>

<script>
import { createService, getMyServices, deliteMyService } from '../api/service.js'
import { authMe } from '../api/user.js';

export default {
	name: "MyServices",
	data() {
		return {
			loading: false,
			name: '',
			info: '',
			price: '',
			infoRules: [v => v.length <= 250 || 'Максимальная кол-во символов 250']
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
		services: {
			get() {
				return this.$store.getters.getMyServices;
			},
			set(value) {
				return this.$store.dispatch('saveMyServicesAll', value)
			}
		},
		rules() {
			return (this.infoRules && this.name?.length > 0 && this.price?.length > 0)
		}
	},
	methods: {
		addService() {
			createService({name: this.name, info: this.info, price: Number(this.price), authorId: this.user._id})
			.then((res) => {
				this.loading = true;
				this.$store.dispatch('saveMyServices', res.data)
			})
			.finally(() => {
				this.loading = false;
			})
		},
		delService(id) {
			deliteMyService({serviceId: id}).then((res) => {
				this.$store.dispatch('saveDeliteMyService', res.data)
			})
		},
		isAuth() {
			if (!localStorage.getItem('token')) {
				this.$router.push('/login');
			} else {
				authMe().then((res) => {
					this.$store.dispatch('saveUser', res.data)
				})
				.finally(() => {
					this.myServices();
				})
			}
		},
		myServices() {
			getMyServices({authorId: this.user._id}).then((res) => {
				this.$store.dispatch('saveMyServicesAll', res.data)
			})
		}
	},
	created() {
		this.isAuth();
	}
}
</script>

<style lang="scss" scoped>
.card-padd {
	width: 100%;
	padding: 40px 20px !important;
}

.card-inner {
    display: flex;
    flex-direction: column;
    gap: 40px;
    img {
        scale: 0.7;
    }
}
.service {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
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