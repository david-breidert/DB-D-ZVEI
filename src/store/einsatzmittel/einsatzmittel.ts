import { Einsatzmittel } from '@/types';
import Decoder from '@/utils/decoder/decoder';
import { Module } from 'vuex';
import { RootState } from '../index';

type EinsatzmittelState = {
  einsatzmittelCollection: Array<{ kanal: string; einsatzmittel: Array<Einsatzmittel> }>;
};

const einsatzmittelModule: Module<EinsatzmittelState, RootState> = {
  state: {
    einsatzmittelCollection: new Array<{ kanal: string; einsatzmittel: Array<Einsatzmittel> }>()
  },
  mutations: {
    ADD_EINSATZMITTEL_TO_COLLECTION(state, obj) {
      state.einsatzmittelCollection.push(obj);
    },
    UPDATE_EINSATZMITTEL(state, { obj, einsatzmittel }) {
      obj.einsatzmittel = einsatzmittel;
    },
    REMOVE_EINSATZMITTEL_FROM_COLLECTION(state, kanal) {
      const i = state.einsatzmittelCollection.findIndex(o => o.kanal == kanal);
      state.einsatzmittelCollection.splice(i, 1);
    }
  },
  actions: {
    updateEinsatzmittelCollection(context) {
      context.rootGetters.getAllDecoders.forEach(async (decoder: Decoder) => {
        const einsatzmittel = await decoder.db.getAlleEm();

        const obj = context.state.einsatzmittelCollection.find(o => o.kanal == decoder.kanal);
        if (obj) {
          context.commit('UPDATE_EINSATZMITTEL', { obj: obj, einsatzmittel: einsatzmittel });
        } else {
          context.commit('ADD_EINSATZMITTEL_TO_COLLECTION', { kanal: decoder.kanal, einsatzmittel: einsatzmittel });
        }
      });
    }
  },
  getters: {
    getAlleEm(state) {
      return state.einsatzmittelCollection;
    }
  }
};

export default einsatzmittelModule;
