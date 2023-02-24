import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('TOUTIAO_USER')
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem('TOUTIAO_USER', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
