import { Module } from 'vuex';
import { RootState } from '../types.index';
import { Alarm, AlarmeState } from './types.alarme';

const alarmeModule: Module<AlarmeState, RootState> = {
  state: () => ({
    alarme: new Array<Alarm>()
  }),
  mutations: {
    ADD_NEW_ALARM(state, alm: Alarm) {
      state.alarme.push(alm);
    },
    ADD_TONFOLGE_ZU_LETZTEM_ALARM(state, tf) {
      state.alarme[state.alarme.length - 1].tonfolge.push(tf);
    },
    REMOVE_OLDEST_ALARM(state) {
      state.alarme.shift();
    }
  },
  actions: {
    addAlarm(context, tf: Array<number>) {
      const zeitstempel = Date.now();
      const currentAlm = context.getters.getLetztenAlarm;
      let arrayEqual = false;
      if (currentAlm) {
        tf.forEach((n, i) => {
          if (n !== currentAlm.tonfolge[currentAlm.tonfolge.length - 1].tf[i]) {
            arrayEqual = false;
          } else {
            arrayEqual = true;
          }
        });
      }

      if (arrayEqual && zeitstempel - currentAlm.tonfolge[currentAlm.tonfolge.length - 1].zeitstempel <= 2000) {
        currentAlm.tonfolge[currentAlm.tonfolge.length - 1].confidence = 2;
      } else if (currentAlm && !arrayEqual && Date.now() - currentAlm.tonfolge[currentAlm.tonfolge.length - 1].zeitstempel <= 10000) {
        context.commit('ADD_TONFOLGE_ZU_LETZTEM_ALARM', {
          tf: tf,
          confidence: 1,
          zeitstempel: zeitstempel,
          em: context.getters.getEinsatzmittelByTf(tf)
        });
      } else {
        if (context.state.alarme.length >= 200) {
          context.commit('REMOVE_OLDEST_ALARM');
        }
        context.commit('ADD_NEW_ALARM', {
          // confidence: 1,
          tonfolge: [
            {
              tf: tf,
              confidence: 1,
              em: context.getters.getEinsatzmittelByTf(tf),
              zeitstempel: zeitstempel
            }
          ]
        });
      }
    }
  },
  getters: {
    getLetztenAlarm(state) {
      if (state.alarme.length > 0) {
        return state.alarme[state.alarme.length - 1];
      } else {
        return null;
      }
    },
    getAlleAlarme(state) {
      return state.alarme;
    }
  }
};

export default alarmeModule;
