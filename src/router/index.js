import VueRouter from "vue-router"
import LoginPage from "@/pages/LoginPage";
import ClassRoom from "@/pages/ClassRoom";

export default new VueRouter({
    routes: [
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/class',
            component: ClassRoom
        }
    ]
})