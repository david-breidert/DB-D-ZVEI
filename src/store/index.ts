import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import einsatzmittel from './einsatzmittel/einsatzmittel';
import alarme from './alarme/alarme';
import Decoder from '@/utils/decoder/decoder';

Vue.use(Vuex);

export type RootState = {
  lastTimeReceived: number;
  decoders: Array<Decoder>;
};

const store: StoreOptions<RootState> = {
  state: {
    lastTimeReceived: 0,
    decoders: []
  },
  mutations: {
    SET_LAST_TIME_RECEIVED(state, time) {
      state.lastTimeReceived = time;
    },
    ADD_DECODER_TO_DECODERS(state, decoder) {
      state.decoders.push(decoder);
    },
    REMOVE_DECODER_FROM_DECODERS(state, decoder: Decoder) {
      const i = state.decoders.findIndex(d => d.kanal == decoder.kanal);
      if (i) state.decoders.splice(i, 1);
    }
  },
  actions: {
    updateLastTimeReceived(context, time) {
      // context.commit('SET_LAST_TIME_RECEIVED', time);
    },
    changeTheme(context) {
      console.log('Switching theme');
      context.commit('SWITCH_THEME');
    },
    addDecoder(context, decoder) {
      context.commit('ADD_DECODER_TO_DECODERS', decoder);
    },
    removeDecoder(context, decoder: Decoder) {
      decoder.stop();
      context.commit('REMOVE_DECODER_FROM_DECODERS', decoder);
    }
  },
  getters: {
    getLastTimeReceived(state) {
      return state.lastTimeReceived;
    },
    getAllDecoders(state) {
      return state.decoders;
    },
    getDecoderByKanal: state => (kanal: string) => {
      return state.decoders.find(d => d.kanal == kanal);
    }
  },
  modules: {
    einsatzmittel: einsatzmittel,
    alarme: alarme
  }
};

export default new Vuex.Store(store);
