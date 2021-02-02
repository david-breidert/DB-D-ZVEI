export default {
  state: () => ({
    einsatzmittel: []
  }),
  mutations: {
    SET_EINSATZMITTEL(state, einsatzmittel) {
      state.einsatzmittel = einsatzmittel
    }
  },
  actions: {
    updateEinsatzmittel(context, newValue) {
      context.commit('SET_EINSATZMITTEL', newValue)
    }
  },
  getters: {
    getEinsatzmittel(state) {
      return state.einsatzmittel
    },
    getEinsatzmittelByTf: state => tf => {
      return tf
        ? state.einsatzmittel.find(em => {
            let equal = true
            em.tonfolge.forEach((value, index) => {
              if (value !== tf[index]) {
                equal = false
              }
            })
            return equal
          })
        : null
    }
  }
}
