import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const actions = {
    login(context) {
        context.commit('LOGIN')
    },
    setAvatar(context, src) {
        context.commit('AVATAR', src)
    },
    setUsername(context, name) {
        context.commit('USERNAME', name)
    },
    setUnitList(context, uList) {
        context.commit('UNITLIST', uList)
    }
}
const mutations = {
    LOGIN(state) {
        state.loginStat = true
    },
    AVATAR(state, src) {
        console.log('调用头像更新')
        state.userAvatar = src
    },
    USERNAME(state, name) {
        state.username = name
    },
    UNITLIST(state, uList) {
        state.unitList = uList
    }
}
const state = {
    loginStat: false,
    userAvatar: '',
    username: '游客',
    unitList: []
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})