<template>
    <v-card class="card-padd">
        <div class="card-inner">
           <div>
                <v-text-field
                type="date"
                variant="outlined"
                density="compact">
                </v-text-field>
                <v-select
                label="Выберите услугу"

                variant="outlined"
                ></v-select>
                <v-combobox
                label="Выберите доступное время"
                :items="['10:00','12:00','14:00','16:00','18:00','20:00']"
                variant="outlined"
                ></v-combobox>
           </div>
        </div>
    </v-card>
</template>

<script>
import { getMyServices } from '../api/service.js'
import { authMe } from '../api/user.js';

export default {
    name: "MyDate",
    data() {
        return {

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
        this.isAuth()
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
}
.time {
    display: flex;
    justify-content: space-between;
}
.time-item {
    cursor: pointer;
    padding: 5px 10px;
    border: 2px solid #fff;
    border-radius: 4px;
    &:active {
        border-color: #2196F3 !important;
    }
}
</style>