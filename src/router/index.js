import { createRouter, createWebHistory, createWebHashHistory} from "vue-router"
import { route_prefix } from '../options'

const routes = [
    {
        path: "/",       // http://localhost:5173
        alias: ["/index", "/home", route_prefix],
        component: () => import("../views/index.vue")
    },
    {
        path: "/search", // http://localhost:5173/search
        alias: [route_prefix + "search"],
        component: () => import("../views/search.vue")
    },
    {
        path: "/backup", // http://localhost:5173/backup
        alias: [route_prefix + "backup"],
        component: () => import("../views/backup.vue")
    },
]

const router = createRouter({
    //使用url的#符号之后的部分模拟url路径的变化,因为不会触发页面刷新,所以不需要服务端支持
    // history: createWebHashHistory(), 
    history: createWebHistory(),
    routes
})

export default router