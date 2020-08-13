import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menuList: [],
    counter: 1,
    updateFormModel: {}

  },
  mutations: {
    menuList (state, payload) {
      state.menuList = payload
    },
    updateFormModel (state, payload) {
      state.updateFormModel = payload
    }
  },
  actions: {
    menuList (context, payload) {
      context.commit('menuList', payload)
    }
  }
})

export default store
