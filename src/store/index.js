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
    setRoleList(context, li) {
        context.commit('ROLE', li)
    },
    setSearchResults(context, results) {
        context.commit('RESULT', results)
    },
    setSearchText(context, text) {
        context.commit('SEARCH', text)
    }
}
const mutations = {
    LOGIN(state) {
        state.loginStat = true
    },
    AVATAR(state, src) {
        state.userAvatar = src
    },
    USERNAME(state, name) {
        state.username = name
    },
    ROLE(state, li) {
        state.roleList = li
    },
    RESULT(state, results) {
        state.searchResultList = results
    },
    SEARCH(state, text) {
        state.searchText = text
    }
}
const state = {
    loginStat: false,
    userAvatar: '',
    username: '游客',
    roleList: [],
    searchResultList: [],
    searchText: ''
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})