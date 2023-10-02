<template>
	<v-card 
	min-width="450"
	class="card-padd card-inner">
		<span class="mdi mdi-account-circle-outline pr"></span>
		<div class="info">
			<template v-if="isCoach">
				<v-text-field
				readonly
				v-model="user.rang"
				placeholder="E-mail"
				prepend-inner-icon="mdi mdi-account-star"
				variant="outlined"
				density="compact">
				</v-text-field>
			</template>
			<v-text-field
			readonly
			v-model="user.email"
			placeholder="E-mail"
			prepend-inner-icon="mdi mdi-email-outline"
			variant="outlined"
			density="compact">
			</v-text-field>
			<v-text-field
			readonly
			v-model="user.name"
			placeholder="Имя"
			prepend-inner-icon="mdi mdi-account-outline"
			variant="outlined"
			density="compact">
			</v-text-field>
		</div>
		<div class="btns">
			<v-btn
			@click="logOut"
			block
			color="error"
			size="large"
			variant="tonal"
			type="submit">
				Выйти из аккаунта
			</v-btn>
			<template v-if="isCoach">
				<v-btn
				@click="$router.push('/profile/myservices')"
				block
				size="large"
				variant="tonal">
				Мои услуги
				</v-btn>
			</template>
			<template v-if="isCoach">
				<v-btn
				block
				size="large"
				variant="tonal">
				Мое расписание
				</v-btn>
			</template>
		</div>
	</v-card>
</template>

<script>
import { authMe } from '../api/user.js';

export default {
	name: "Profile",
	computed: {
		user: {
			get() {
				return this.$store.getters.getUser;
			},
			set(value) {
				return this.$store.dispatch('saveUser', value)
			}
		},
		isCoach() {
			return this.user.type === 'coach'
		}
	},
	methods: {
		logOut() {
			localStorage.removeItem('token');
			this.$router.push('/login');
			this.$store.dispatch('saveUser', {})
		},
		isAuth() {
			if (!localStorage.getItem('token')) {
				this.$router.push('/login');
			} else {
				authMe().then((res) => {
					this.$store.dispatch('saveUser', res.data)
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
.card-padd {
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
.btns {
	display: flex;
    flex-direction: column;
    gap: 20px;
}
.pr {
	font-size: 200px;
}

</style>