<template>
  <v-sheet rounded class="fill-height elevation-2">
    <v-list rounded class="flex-column-reverse">
      <template v-for="(alarm, index) in reverseAlarme">
        <v-list-item class="ma-0" :key="index">
          <v-list-item-icon class="my-0 fill-height">
            <v-alert icon="mdi-bell-ring" color="primary" dense text class="my-0 mx-2">
              {{ getAlarmTimeString(alarm) }}
            </v-alert>
          </v-list-item-icon>

          <v-list-item-content class="d-flex">
            <span>
              <template v-for="(tf, i) in alarm.tonfolge">
                <v-chip label @click="addEmFromTonfolge(tf.em, tf.tf)" outlined class="mx-2" :class="{ success: tf.confidence === 2, warning: tf.confidence === 1, 'success--text': tf.confidence === 2, 'warning--text': tf.confidence === 1 }" :key="i">
                  {{ tf.em ? tf.em.einsatzmittel : tf.tf }}
                </v-chip>

                <span v-if="!(i === alarm.tonfolge.length - 1)" :key="tf.zeitstempel + '-divider'">
                  -
                </span>
              </template>
            </span>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index + '-divider'" />
      </template>
    </v-list>
    <EinsatzmittelDialog v-model="dialog" :dialog="dialog" :em="emToEdit" :tf="tfToAdd" @addEm="addEm"></EinsatzmittelDialog>
  </v-sheet>
</template>

<script lang="ts">
import { Alarm } from '@/store/alarme/types.alarme';
import { Einsatzmittel } from '@/store/einsatzmittel/types.einsatzmittel';
import EinsatzmittelDialog from '@/components/TheEinsatzmittelDialog.vue';
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  data: () => ({
    currentlyPlaying: null,
    tfToAdd: [] as Array<number> | null,
    emToEdit: null as Einsatzmittel | null,
    dialog: false
  }),
  components: {
    EinsatzmittelDialog
  },
  computed: {
    ...mapGetters(['getAlleAlarme']),
    reverseAlarme() {
      return this.getAlleAlarme.slice().reverse();
    }
  },
  watch: {
    dialog(newVal) {
      if (newVal == false) {
        this.emToEdit = null;
        this.tfToAdd = null;
      }
    }
  },
  methods: {
    getAlarmTimeString(alarm: Alarm) {
      const date = new Date(alarm.tonfolge[0].zeitstempel);
      return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    addEmFromTonfolge(em?: Einsatzmittel, tf?: Array<number>) {
      console.log('addEmFromTonfolge called with ' + em + '' + tf);
      if (tf) this.tfToAdd = [...tf];
      if (em) {
        const obj: Einsatzmittel = { _id: '', einsatzmittel: '', tonfolge: new Array<number>() };
        Object.assign(obj, em);
        this.emToEdit = obj;
      }
      console.log(this.emToEdit);
      this.dialog = true;
    },
    addEm(em: Einsatzmittel) {
      this.$store.dispatch('addEinsatzmittel', em);
    }
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
