import { Module } from 'vuex';
import { Alarm } from '../alarme/types.alarme';
import { RootState } from '../types.index';
import { Einsatzmittel, EinsatzmittelState } from './types.einsatzmittel';

const einsatzmittelModule: Module<EinsatzmittelState, RootState> = {
  state: () => ({
    einsatzmittel: new Array<Einsatzmittel>()
  }),
  mutations: {
    SET_EINSATZMITTEL(state, einsatzmittel) {
      state.einsatzmittel = einsatzmittel;
    },
    ADD_EINSATZMITTEL(state, em) {
      console.log('Inserting EM into array');
      console.log(em);
      state.einsatzmittel.push(em);
    }
  },
  actions: {
    updateEinsatzmittel(context, newValue) {
      context.commit('SET_EINSATZMITTEL', newValue);
    },
    addEinsatzmittel(context, em) {
      console.log('logging from action');
      console.log(em);
      context.commit('ADD_EINSATZMITTEL', em);
    }
  },
  getters: {
    getEinsatzmittel(state) {
      return state.einsatzmittel;
    },
    getEinsatzmittelByTf: state => (tf: Array<number>) => {
      return tf
        ? state.einsatzmittel.find(em => {
            let equal = true;
            em.tonfolge.forEach((value, index) => {
              if (value !== tf[index]) {
                equal = false;
              }
            });
            return equal;
          })
        : null;
    }
  }
};

export default einsatzmittelModule;
