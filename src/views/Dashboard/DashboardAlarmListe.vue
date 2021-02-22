<template>
  <v-sheet rounded class="fill-height elevation-2">
    <v-list rounded class="flex-column-reverse fill-height">
      <template v-for="(alarm, index) in reverseAlarme">
        <v-list-item class="ma-0 " :key="index">
          <v-list-item-icon class="my-0 fill-height">
            <v-alert icon="mdi-bell-ring" color="primary" dense text class="my-0 mx-2">
              {{ getAlarmTimeString(alarm) }}
            </v-alert>
          </v-list-item-icon>

          <v-list-item-content class="d-flex">
            <span>
              <template v-for="(ruf, i) in alarm">
                <v-chip label outlined class="mx-2 my-1" :class="{ success: ruf.confidence === 2, warning: ruf.confidence === 1, 'success--text': ruf.confidence === 2, 'warning--text': ruf.confidence === 1 }" :key="i">
                  {{ getRufDisplayString(ruf) }}
                </v-chip>
                <span v-if="!(i === alarm.length - 1)" :key="ruf.zeitstempel + '-divider'"> - </span>
              </template>
            </span>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index + '-divider'" />
      </template>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { Alarm, Einsatzmittel, Ruf } from '@/types';
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  data: () => ({
    currentlyPlaying: null,
    dialog: false
  }),
  components: {},
  computed: {
    ...mapGetters(['getAlleAlarme', 'getAlleEm']),
    reverseAlarme(): Array<Alarm> {
      return this.getAlleAlarme.slice().reverse() as Alarm[];
    }
  },
  methods: {
    getAlarmTimeString(alarm: Alarm) {
      const date = new Date(alarm[0].zeitstempel);
      return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    getRufDisplayString(ruf: Ruf) {
      let arr = new Array<Einsatzmittel>();
      const obj = this.getAlleEm.find((obj: { kanal: string; einsatzmittel: Array<Einsatzmittel> }) => obj.kanal == ruf.kanal);
      if (obj) {
        arr = obj.einsatzmittel;
      }
      if (arr) {
        const result = arr.find(em => {
          let arrayEqual = true;
          em.tonfolge.forEach((n, i) => {
            if (n !== ruf.tonfolge[i]) {
              arrayEqual = false;
            }
          });
          return arrayEqual;
        })?.name;

        if (result) {
          return result;
        } else {
          return ruf.tonfolge;
        }
      } else {
        return ruf.tonfolge;
      }
    }
  },
  created() {
    this.$store.dispatch('updateEinsatzmittelCollection');
  }
});
</script>

<style lang="scss" scoped>
.v-list {
  background: transparent !important;
  padding: 0;
  overflow: auto;
}

.v-list-item {
  min-height: 60px;
  background-color: transparent;
  .v-list-item__icon {
    align-self: initial;
    margin: 0;
  }
  .v-chip {
    height: 40px;
    &:hover::before {
      opacity: 0;
    }
  }
}

// .v-list-item:first-child:hover::before {
//   border-bottom-left-radius: 8px;
//   border-bottom-right-radius: 8px;
// }

::-webkit-scrollbar {
  display: none;
}

.v-icon.v-icon:focus::after {
  opacity: 0;
}
.v-icon.v-icon:hover::after {
  opacity: 0.24;
}
</style>
