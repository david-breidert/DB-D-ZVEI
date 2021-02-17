<template>
  <v-app>
    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
    <AppUpdateDialog />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Decoder from './utils/decoder/decoder';
import AppUpdateDialog from './components/AppUpdateDialog.vue';
import AppHeader from './components/AppHeader.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppUpdateDialog
  },
  data: () => ({
    decoders: new Array<Decoder>()
  }),
  mounted() {
    const ch357 = new Decoder('357');
    ch357.onReceived = () => {
      this.$store.dispatch('updateLastTimeReceived', Date.now());
    };
    ch357.onTonfolge = tonfolge => {
      this.$store.dispatch('addAlarm', tonfolge);
    };
    this.decoders.push(ch357);
    this.decoders.forEach(decoder => decoder.start());
  }
});
</script>
