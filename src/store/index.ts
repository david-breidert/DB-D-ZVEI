import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import einsatzmittel from './einsatzmittel/einsatzmittel';
import alarme from './alarme/alarme';

import { RootState } from './types.index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    lastTimeReceived: 0
  },
  mutations: {
    SET_LAST_TIME_RECEIVED(state, time) {
      state.lastTimeReceived = time;
    }
  },
  actions: {
    updateLastTimeReceived(context, time) {
      context.commit('SET_LAST_TIME_RECEIVED', time);
    }
  },
  getters: {
    getLastTimeReceived(state) {
      return state.lastTimeReceived;
    }
  },
  modules: {
    einsatzmittel: einsatzmittel,
    alarme: alarme
  }
};

export default new Vuex.Store(store);
