import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: [],
    }
    // ,  博客
    // {
    //     path: "/404",
    //     name: "NotFound",
    //     component: async () => await import("@/views/404/index.vue"),
    //     meta: {
    //         title: "404",
    //         auth: false,
    //     },
    // },
    // {
    //     path: "/:pathMatch(.*)", //
    //     redirect: "/404",
    // },
];

// 配置router
const router = createRouter({
   history: createWebHistory(),
   //   history:createWebHashHistory(),
    routes
});

// 导出路由
export default router;
