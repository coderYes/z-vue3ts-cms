import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/base.less'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
