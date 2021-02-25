import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import einsatzmittel from './einsatzmittel/einsatzmittel';
import alarme from './alarme/alarme';
import Decoder from '@/utils/decoder/decoder';

Vue.use(Vuex);

export type RootState = {
  lastTimeReceived: number;
  decoders: [Decoder?, Decoder?];
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
      if (state.decoders.length < 2) state.decoders.push(decoder);
    },
    REMOVE_DECODER_FROM_DECODERS(state, decoder: Decoder) {
      console.log('trying to remove decoder');
      const i = state.decoders.findIndex(d => {
        if (d) return d.kanal == decoder.kanal;
      });
      console.log(i);
      if (state.decoders.length == 1 || i == 0) {
        state.decoders.shift();
      } else {
        if (i) state.decoders.splice(i, 1);
      }
      console.log(state.decoders);
    }
  },
  actions: {
    // updateLastTimeReceived(context, time) {
    //   context.commit('SET_LAST_TIME_RECEIVED', time);
    // },
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
    getDecoderSettings(state, getters) {
      const decoderSettings = new Array<{ kanal: string; inputId: string | undefined; running: boolean }>();
      getters.getAllDecoders.forEach((d: Decoder) => decoderSettings.push({ kanal: d.kanal, inputId: d.inputId, running: d.running }));
      return decoderSettings;
    },
    getDecoderByKanal: state => (kanal: string) => {
      if (state.decoders.length > 0) {
        return state.decoders.find(d => {
          if (d) return d.kanal == kanal;
        });
      }
    }
  },
  modules: {
    einsatzmittel: einsatzmittel,
    alarme: alarme
  }
};

export default new Vuex.Store(store);
