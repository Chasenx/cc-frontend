import { createApp } from 'vue'
import App from './App.vue'
import bkui from 'bkui-vue'
import 'bkui-vue/dist/style.css'
createApp(App)
.use(bkui)
.mount('#app')
