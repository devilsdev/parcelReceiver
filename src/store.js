import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    authenticated: false
  },
  mutations: {
    changeAuthenticated(state, userLoggedIn) {
      state.authenticated = userLoggedIn
    }
  },
  getters: {
    authenticated: state => state.authenticated
  }
})