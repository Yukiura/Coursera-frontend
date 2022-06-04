import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import router from "@/router";
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    store,
    beforeCreate() {
        // 全局事件总线
        Vue.prototype.$bus = this
    },
    created() {
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
            console.log("加载数据: " + JSON.parse(sessionStorage.getItem('store')))
            console.log("加载store: " + this.$store.state)
        }
        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state));
            console.log("保存数据: " + JSON.stringify(this.$store.state))
        });
    },
    router: router
}).$mount('#app')
