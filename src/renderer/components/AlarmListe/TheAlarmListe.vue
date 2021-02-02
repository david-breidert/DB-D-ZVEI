<template>
  <v-sheet class="fill-height elevation-3" rounded>
    <v-list class="fill-height flex-column-reverse">
      <template v-for="(alarm, index) in reverseAlarme">
        <v-list-item :key="index">
          <v-list-item-icon>
            <v-chip small outlined label color="primary">
              <v-icon small>
                mdi-bell-ring
              </v-icon>
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
                  >{{ tf.em ? tf.em.einsatzmittel : tf.tf }}</span
                >
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
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    currentlyPlaying: null
  }),
  computed: {
    ...mapGetters(['getAlleAlarme']),
    reverseAlarme() {
      return this.getAlleAlarme.slice().reverse()
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
}

::v-deep ::-webkit-scrollbar-track {
  margin-top: 38px;
  margin-bottom: 5px;
}

.theme--dark.v-btn:focus::before {
  opacity: 0;
}
</style>
