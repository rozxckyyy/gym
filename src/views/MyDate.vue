<template>
    <div class="service">
        <v-card class="card-padd">
            <div class="card-inner">
                <v-text-field
                v-model="date"
                type="date"
                variant="outlined"
                density="compact">
                </v-text-field>
                <v-select
                v-model="selectedService"
                label="Выберите услугу"
                no-data-text="Услуги не загружены"
                :items="services"
                item-value="_id"
                item-title="name"
                variant="outlined">
                </v-select>
                <v-select
                v-model="time"
                label="Выберите доступное время"
                :items="['10:00','12:00','14:00','16:00','18:00','20:00']"
                variant="outlined">
                </v-select>
                <v-btn
                @click="create"
                :disabled="!isDisabled"
                block
                color="blue"
                size="large"
                variant="tonal">
                    Добавить в расписание
                </v-btn>
            </div>
        </v-card>
    
    <div class="my-services">
			<template v-for="serviceDate in servicesDate">
				<v-card>
					<div class="card">
						<div class="card-text">
							<span class="mdi mdi-account"></span>
							<div class="card-inner1">
								<p class="title">{{ serviceDate.date }} | {{ serviceDate.time }}</p>
								<p class="up-title">{{ serviceDate.service.name }}</p>
								<p class="title">{{ serviceDate.service.price }} ₽</p>
							</div>
						</div>
						<v-btn @click="delService(serviceDate._id)" variant="plain" class="err">
							<span class="mdi mdi-delete"></span>
						</v-btn>
					</div>
                    <template v-if="serviceDate?.userId?.length > 0">
                        <v-divider class="border-opacity-50"></v-divider>
                        <div class="card">
                            <p>Забронировано</p>
                        </div>
                    </template>
				</v-card>
			</template>
		</div>
    </div>
</template>

<script>
import { getMyServices, selectServiceForDate, ServicesByCoachAll, deliteService } from '../api/service.js'
import { authMe } from '../api/user.js';

export default {
    name: "MyDate",
    data() {
        return {
            date: '',
            selectedService: '',
            time: ''
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
        servicesDate: {
            get() {
				return this.$store.getters.getMyServicesDate;
			},
			set(value) {
				return this.$store.dispatch('saveMyServicesDate', value)
			}
        },
        isDisabled() {
            return (this.date.length > 0 && this.selectedService.length > 0 && this.time.length > 0) 
        }
    },
    methods: {
        selectDate() {
            console.log('ok')
        },
		isAuth() {
			if (!localStorage.getItem('token')) {
				this.$router.push('/login');
			} else {
				authMe().then((res) => {
					this.$store.dispatch('saveUser', res.data)
                    this.myServices();
                    this.myServicesDate()
				})
			}
		},
		myServices() {
			getMyServices({authorId: this.user._id}).then((res) => {
				this.$store.dispatch('saveMyServicesAll', res.data)
			})
		},
        myServicesDate() {
            ServicesByCoachAll({_id: this.user._id}).then((res) => {
				this.$store.dispatch('saveMyServicesDateAll', res.data)
			})
        },
        create() {
            selectServiceForDate({date: this.date, time: this.time, serviceId: this.selectedService, authorId: this.user._id}).then((res) => {
                this.$store.dispatch('saveMyServicesDate', res.data)
            })
        },
        delService(id) {
            deliteService({serviceId: id}).then((res) => {
                this.$store.dispatch('saveDeliteMyServicesDate', res.data)
            })
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