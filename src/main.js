import { createApp } from 'vue'
import App from './App.vue'
import bkui from 'bkui-vue'
import 'bkui-vue/dist/style.css'
import router from './router'
createApp(App)
.use(router)
.use(bkui)
.mount('#app')
