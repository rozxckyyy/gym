<template>
    <v-card
    max-width="450"
    min-width="450"
    class="card-padd">
        <v-form 
        
        v-model="form"
        @submit.prevent="onSubmit" 
        class="card-inner">
           <div class="card-fields">
                <v-text-field
                v-model="email"
                placeholder="E-mail"
                :rules="[rules.empty, rules.email]"
                prepend-inner-icon="mdi mdi-email-outline"
                variant="outlined"
                density="compact">
                </v-text-field>
                <v-text-field
                v-model="pass1"
                :rules="[rules.empty, rules.minLenght, rules.maxLenght, rules.correct]"
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
                :rules="[rules.empty, rules.minLenght, rules.maxLenght]"
                :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible2 ? 'text' : 'password'"
                density="compact"
                placeholder="Повторите пароль"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible2 = !visible2">
                </v-text-field>
           </div>
           <div class="card-btns">
                <v-btn
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
export default {
    name: "Reg",
    data: () => ({
        visible: false,
        visible2: false,
        pass1: '',
        pass2: '',
        email: '',
        rules: {
            empty: value => !!value || 'Пустое поле',
            maxLenght: value => value.length <= 20 || 'Макисмальная длина 20',
            minLenght: value => value.length >= 6 || 'Минимальная длина 6',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Некоректный e-mail'
            },
            correct: value => {
                if (value === this.pass2) return true
                return 'Пароли не совпадают'
            }
        }
    }),
}
</script>

<style lang="scss">
.card-padd {
    padding: 40px 20px !important;
}
.card-inner {
    display: flex;
    flex-direction: column;
    gap: 40px;
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