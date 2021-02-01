import Vue from 'vue'
import Vuex from 'vuex'
import einsatzmittel from './einsatzmittel'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    einsatzmittel: einsatzmittel
  }
})
