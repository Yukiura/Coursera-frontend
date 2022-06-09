import VueRouter from "vue-router"
import LoginPage from "@/pages/LoginPage";
import ClassRoom from "@/pages/ClassRoom";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";
import HomePage from "@/pages/HomePage";
import MyCourses from "@/pages/MyCourses";

export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: HomePage
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/class',
            name: 'classroom',
            component: ClassRoom
        },
        {
            path: '/register',
            component: RegisterPage,
            props: true
        },
        {
            path: '/search',
            component: SearchPage,
            props: true
        },
        {
            path: '/mycourses',
            component: MyCourses
        }
    ]
})