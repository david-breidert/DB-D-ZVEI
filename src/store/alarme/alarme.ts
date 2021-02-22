import { Alarm, Ruf, ValidatedTonfolge } from '@/types';
import { Module } from 'vuex';
import { RootState } from '../index';

export type AlarmeState = {
  alarme: Array<Alarm>;
};

const alarmeModule: Module<AlarmeState, RootState> = {
  state: () => ({
    alarme: new Array<Alarm>()
  }),
  mutations: {
    ADD_NEW_ALARM(state, alm: Alarm) {
      state.alarme.push(alm);
    },
    ADD_RUF_TO_LAST_ALARM(state, ruf: Ruf) {
      state.alarme[state.alarme.length - 1].push(ruf);
    },
    INCREASE_CONFIDENCE_OF_LAST_RUF(state, ruf: Ruf) {
      ruf.confidence++;
    },
    REMOVE_OLDEST_ALARM(state) {
      state.alarme.shift();
    }
  },
  actions: {
    addAlarm(context, { kanal, tonfolge }: { kanal: string; tonfolge: ValidatedTonfolge }) {
      const zeitstempel = Date.now();
      const currentAlm: Alarm = context.getters.getLetztenAlarm;
      let arrayEqual = false;
      if (currentAlm && currentAlm[currentAlm.length - 1].kanal == kanal) {
        tonfolge.forEach((n, i) => {
          if (n !== currentAlm[currentAlm.length - 1].tonfolge[i]) {
            arrayEqual = false;
          } else {
            arrayEqual = true;
          }
        });
      }

      if (arrayEqual && zeitstempel - currentAlm[currentAlm.length - 1].zeitstempel <= 2000) {
        context.commit('INCREASE_CONFIDENCE_OF_LAST_RUF', currentAlm[currentAlm.length - 1]);
      } else if (currentAlm && !arrayEqual && Date.now() - currentAlm[currentAlm.length - 1].zeitstempel <= 10000) {
        context.commit('ADD_RUF_TO_LAST_ALARM', {
          kanal: kanal,
          tonfolge: tonfolge,
          confidence: 1,
          zeitstempel: zeitstempel
        } as Ruf);
      } else {
        if (context.state.alarme.length >= 200) {
          context.commit('REMOVE_OLDEST_ALARM');
        }
        context.commit('ADD_NEW_ALARM', [
          {
            kanal: kanal,
            tonfolge: tonfolge,
            confidence: 1,
            zeitstempel: zeitstempel
          } as Ruf
        ]);
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
