import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state.js'
// import mutations from './mutations.js'
// import getters from './getters.js'
// import actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        sideBarStatus: false,
        userInfo: null
    },
    mutations: {
        setSideBarStatus(state, data) {
            state.sideBarStatus = data
        },
        setUserInfo(state, data) {
            state.userInfo = data
        }
    },
    actions: {},
    modules: {}
})

export default store
