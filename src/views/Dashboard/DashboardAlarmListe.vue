<template>
  <v-sheet class="fill-height elevation-2" rounded>
    <v-list dense class="fill-height flex-column-reverse rounded-b">
      <template v-for="(alarm, index) in reverseAlarme">
        <v-list-item :key="index">
          <v-list-item-icon>
            <v-chip small outlined label color="primary">
              <v-icon left small>
                mdi-bell-ring
              </v-icon>
              {{ getAlarmTimeString(alarm) }}
            </v-chip>
          </v-list-item-icon>

          <v-list-item-content class="d-flex">
            <span>
              <template v-for="(tf, i) in alarm.tonfolge">
                <span
                  :key="tf.zeitstempel"
                  :class="{
                    'success--text': tf.confidence === 2,
                    'warning--text': tf.confidence === 1
                  }"
                  >{{ tf.em ? tf.em.einsatzmittel : tf.tf }}
                </span>
                <v-icon
                  v-if="!tf.em"
                  :key="tf.zeitstempel + '-button'"
                  x-small
                  @click="addEmFromTonfolge(tf.tf)"
                  >mdi-plus</v-icon
                >

                <span
                  v-if="!(i === alarm.tonfolge.length - 1)"
                  :key="tf.zeitstempel + '-divider'"
                >
                  -
                </span>
              </template>
            </span>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index + '-divider'" />
      </template>
    </v-list>
    <EinsatzmittelDialog
      v-model="dialog"
      :dialog="dialog"
      :tf="tfToAdd"
      @addEm="addEm"
    ></EinsatzmittelDialog>
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
    tfToAdd: new Array<number>(),
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
  methods: {
    getAlarmTimeString(alarm: Alarm) {
      const date = new Date(alarm.tonfolge[0].zeitstempel);
      return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    addEmFromTonfolge(tf: Array<number>) {
      this.tfToAdd = tf;
      this.dialog = true;
    },
    addEm(em: Einsatzmittel) {
      this.$store.dispatch('addEinsatzmittel', em);
    }
  }
});
</script>

<style lang="scss" scoped>
// .v-list {
//   background-color: transparent;
//   padding: 0;
//   overflow: auto;
// }

.v-list-item:first-child:hover::before {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

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
