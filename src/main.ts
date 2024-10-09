import {createApp} from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import routes from "./config/route.ts";
import Vant from 'vant';
import 'vant/lib/index.css';
import '../global.css';


const app = createApp(App);
app.use(Vant)


const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,                     // 路由配置数组，定义各个路由的路径和对应组件
})
app.use(router)

app.mount('#app')




