<template>
  <v-sheet class="fill-height elevation-3" rounded>
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
            <v-list-item-title>
              <template v-for="(tf, i) in alarm.tonfolge">
                <span
                  :key="tf.zeitstempel"
                  :class="{
                    'success--text': tf.confidence === 2,
                    'warning--text': tf.confidence === 1
                  }"
                  >{{ tf.em ? tf.em.einsatzmittel : tf.tf }}
                </span>
                <v-btn
                  v-if="!tf.em"
                  x-small
                  :key="tf.zeitstempel + '-button'"
                  text
                  icon
                  class="ml-1"
                  @click="addEmFromTonfolge(tf.tf)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>

                <span
                  v-if="!(i === alarm.tonfolge.length - 1)"
                  :key="tf.zeitstempel + '-divider'"
                >
                  -
                </span>
              </template>
            </v-list-item-title>
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

<script>
import { mapGetters } from 'vuex'
import EinsatzmittelDialog from '@/renderer/components/EinsatzmittelTabelle/EinsatzmittelDialog'

export default {
  data: () => ({
    currentlyPlaying: null,
    tfToAdd: null,
    dialog: false
  }),
  components: { EinsatzmittelDialog },
  computed: {
    ...mapGetters(['getAlleAlarme']),
    reverseAlarme() {
      return this.getAlleAlarme.slice().reverse()
    }
  },
  methods: {
    getAlarmTimeString(alarm) {
      let date = new Date(alarm.tonfolge[0].zeitstempel)
      return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    addEmFromTonfolge(tf) {
      this.tfToAdd = tf
      this.dialog = true
    },
    addEm(em) {
      this.$store.dispatch('addEinsatzmittel', em)
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  margin-right: 0;
  margin-left: 0;
}

.v-list {
  background-color: transparent;
  padding: 0;
  overflow: auto;
}

.v-list-item:first-child:hover::before {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

::-webkit-scrollbar {
  display: none;
}
</style>
