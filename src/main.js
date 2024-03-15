import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import bkui from 'bkui-vue'
import 'bkui-vue/dist/style.css'
import router from './router'
createApp(App)
.use(router)
.use(bkui)
.use(i18n)
.mount('#app')
