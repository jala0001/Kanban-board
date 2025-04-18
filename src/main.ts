// 👉 Globale styles og fonts
import 'vuetify/styles' // Vuetify core CSS
import '@mdi/font/css/materialdesignicons.css' // Material Design Icons
import './assets/main.css' // Din egen CSS (valgfri, behold hvis du bruger den)

// 👉 Vue core og plugins
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 👉 Vuetify plugin (fra plugins/vuetify.ts)
import { vuetify } from './plugins/vuetify'

// 👉 Initier appen
const app = createApp(App)

app.use(createPinia()) // Pinia til state management
app.use(router)        // Router
app.use(vuetify)       // Vuetify til styling og komponenter

app.mount('#app')      // Mount til DOM
