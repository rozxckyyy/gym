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
                placeholder="E-mail"
                prepend-inner-icon="mdi mdi-email-outline"
                variant="outlined"
                density="compact"
                v-model="email"
                :rules="emailRules">
                </v-text-field>
                <v-text-field
                v-model="pass"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Введите пароль"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                :rules="passRules">
                </v-text-field>
                <template v-if="errMsg.length > 0">
                    <v-alert :text="errMsg" type="error" variant="tonal"></v-alert>
                </template>
           </div>
           <div class="card-btns">
                <v-btn
                :loading="loading"
                :disabled="!validForm"
                block
                color="blue"
                size="large"
                variant="tonal"
                @click="validate">
                Войти
                </v-btn>
                <router-link class="text-blue text-decoration-none" to="/reg">
                    Зарегистрироваться <v-icon icon="mdi-chevron-right"></v-icon>
                </router-link>
           </div>
        </v-form>
    </v-card>
</template>

<script>
import { authLogin } from '../api/user.js'

export default {
    name: "Login",
    data() {
        return {
            errMsg: '',
            loading: false,
            validForm: false,
            visible: false,
            pass: '',
            email: '',
            passRules: [
                value => !!value || 'Пустое поле',
            ],
            emailRules: [
                value => !!value || 'Пустое поле',
                value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Некоректный e-mail'
                }
            ]
        }
    },
    computed: {
        // get() {
        //     return this.$store.getters.getUser;
        // },
        // set(value) {
        //     return this.$store.dispatch()
        // }
    },
    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                authLogin({password: this.pass, email: this.email})
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