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
        curPage: 'home'
    },
    mutations: {
        setSideBarStatus(state, data) {
            state.sideBarStatus = data
        },
        setCurPage(state, data) {
            state.curPage = data
        }
    },
    actions: {},
    modules: {}
})

export default store
