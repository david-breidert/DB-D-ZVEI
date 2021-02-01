const { ipcRenderer } = require('electron')

export default {
  state: () => ({
    einsatzmittel: []
  }),
  mutations: {
    ADD_EM_TO_EINSATZMITTEL(state, em) {
      state.einsatzmittel.push(em)
    },
    EDIT_EM_IN_EINSATZMITTEL(state, em) {
      let index = state.einsatzmittel.findIndex(e => e._id === em._id)
      state.einsatzmittel.splice(index, 1, em)
    },
    REMOVE_EM_FROM_EINSATZMITTEL(state, em) {
      let index = state.einsatzmittel.findIndex(e => e._id === em._id)
      state.einsatzmittel.splice(index, 1)
    }
  },
  actions: {
    addEinsatzmittel({ commit }, em) {
      commit('ADD_EM_TO_EINSATZMITTEL', em)
      ipcRenderer.send('addEm', em)
    },
    editEinsatzmittel({ commit }, em) {
      commit('EDIT_EM_IN_EINSATZMITTEL', em)
      ipcRenderer.send('editEm', em)
    },
    removeEinsatzmittel({ commit }, em) {
      commit('REMOVE_EM_FROM_EINSATZMITTEL', em)
      ipcRenderer.send('removeEm', em)
    }
  },
  getters: {}
}
