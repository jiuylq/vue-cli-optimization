import Vue from 'vue'
import Vuex from 'vuex'

import state from './state' // 根级别的 mutations
import mutations from './mutations' // 根级别的 mutations
import actions from './actions' // 根级别的 action
import getters from './getters' // 根级别的 getters
import modules from './modules' // 模块

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  strict: process.env.NODE_ENV === 'development'
})

export default store
