import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "../AuthGuard";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: AuthGuard
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/attendance",
        name: "Attendance",
        component: () => import("../views/Attendance.vue"),
        beforeEnter: AuthGuard
    },
    {
        path: "/signin",
        name: "Signin",
        component: () => import("../views/Signin.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
