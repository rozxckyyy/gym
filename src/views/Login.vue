<template>
    <v-card
    max-width="450"
    min-width="450"
    class="card-padd">
        <div class="card-inner">
           <div class="card-fields">
                <v-text-field
                placeholder="E-mail"
                prepend-inner-icon="mdi mdi-email-outline"
                variant="outlined"
                density="compact">
                </v-text-field>
                <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Введите пароль"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible">
                </v-text-field>
           </div>
           <div class="card-btns">
                <v-btn
                block
                color="blue"
                size="large"
                variant="tonal">
                Войти
                </v-btn>
                <router-link class="text-blue text-decoration-none" to="/reg">
                    Зарегистрироваться <v-icon icon="mdi-chevron-right"></v-icon>
                </router-link>
           </div>
        </div>
    </v-card>
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        visible: false,
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