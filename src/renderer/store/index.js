import Vue from 'vue'
import Vuex from 'vuex'
import einsatzmittel from './einsatzmittel'
import alarme from './alarme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    einsatzmittel: einsatzmittel,
    alarme: alarme
  }
})
