<template>
    <v-card
    max-width="450"
    min-width="450"
    class="card-padd">
        <v-form 
        lazy-validation
        v-model="validForm"
        ref="form"
        class="card-inner">
           <div class="card-fields">
                <img src="../assets/logo.png"/>
                <v-text-field
                v-model="email"
                placeholder="E-mail"
                :rules="emailRules"
                prepend-inner-icon="mdi mdi-email-outline"
                variant="outlined"
                density="compact">
                </v-text-field>
                <v-text-field
                v-model="name"
                placeholder="Имя"
                :rules="nameRules"
                prepend-inner-icon="mdi mdi-account-outline"
                variant="outlined"
                density="compact">
                </v-text-field>
                <v-text-field
                v-model="pass1"
                :rules="pass1Rules"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Введите пароль"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible">
                </v-text-field>
                <v-text-field
                v-model="pass2"
                :rules="pass2Rules"
                :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible2 ? 'text' : 'password'"
                density="compact"
                placeholder="Повторите пароль"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible2 = !visible2">
                </v-text-field>
                <template v-if="errMsg.length > 0">
                    <v-alert :text="errMsg" type="error" variant="tonal"></v-alert>
                </template>
           </div>
           <div class="card-btns">
                <v-btn
                :loading="loading"
                @click="validate"
                :disabled="!validForm"
                block
                color="blue"
                size="large"
                variant="tonal"
                type="submit">
                Зарегистрироваться
                </v-btn>
                <RouterLink class="text-blue text-decoration-none" to="/login">
                    Уже есть аккаунт <v-icon icon="mdi-chevron-right"></v-icon>
                </RouterLink>
           </div>
        </v-form>
    </v-card>
</template>

<script>
import { authReg } from '../api/user.js'

export default {
    name: "Reg",
    data() {
        return {
            errMsg: '',
            loading: false,
            validForm: false,
            visible: false,
            visible2: false,
            pass1: '',
            pass2: '',
            email: '',
            name: '',
            pass1Rules: [
                value => !!value || 'Пустое поле',
                value => (value && value.length >= 6) || 'Минимальная длина 6'
            ],
            pass2Rules: [
                value => !!value || 'Пустое поле',
                value => (value === this.pass1) || 'Пароли не совпадают'
            ],
            emailRules: [
                value => !!value || 'Пустое поле',
                value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Некоректный e-mail'
                }
            ],
            nameRules: [
                value => !!value || 'Пустое поле',
                value => (value && value.length >= 3) || 'Минимальная длина 3'
            ]
        }
    },
    computed: {

    },
    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                authReg({password: this.pass1, email: this.email, name: this.name})
                .then((res) => {
                    this.loading = true;
                    if ('token' in res.data) {
                        window.localStorage.setItem('token', res.data.token)
                        this.$store.dispatch('saveUser', res.data)
                        this.errMsg = '';
                        this.$router.push('/menu')
                    }
                })
                .catch((err) => {
                    this.errMsg = err.response.data.message;
                })
                .finally(() => {
                    this.loading = false;
                })
            }
        },
        isAuth() {
            if (localStorage.getItem('token')) {
                this.$router.push('/menu')
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
.card-fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.card-btns {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>