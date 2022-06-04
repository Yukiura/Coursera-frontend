import VueRouter from "vue-router"
import LoginPage from "@/pages/LoginPage";
import ClassRoom from "@/pages/ClassRoom";
import RegisterPage from "@/pages/RegisterPage";

export default new VueRouter({
    routes: [
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/class',
            component: ClassRoom
        },
        {
            path: '/register',
            component: RegisterPage,
            props: true
        }
    ]
})