import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store/index.js'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ // UI библиотека и ее конфиг
    components,
    directives,
    theme: {
        defaultTheme: "dark",
    },
})

createApp(App).use(store).use(router).use(vuetify).mount('#app') // Подключение стора, роутера и всего остального
