<template>
  <v-app :style="{ background: 'var(--v-bgPrimary-base)' }">
    <AppHeader />
    <AppSideBar />
    <v-main class="fill-height">
      <v-container fluid class="fill-height">
        <router-view />
      </v-container>
    </v-main>
    <AppUpdateDialog />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Decoder from './utils/decoder/decoder';
import AppUpdateDialog from './components/AppUpdateDialog.vue';
import AppHeader from './components/AppHeader.vue';
import AppSideBar from './components/AppSideBar.vue';
import { ipcRenderer } from 'electron';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppUpdateDialog,
    AppSideBar
  },
  data: () => ({
    decoders: new Array<Decoder>(),
    isUpdateAvailable: false
  }),
  mounted() {
    ipcRenderer.send('getEm', {});
    ipcRenderer.on('postEm', (event, em) => {
      this.$store.dispatch('updateEinsatzmittel', em);
    });

    // Decoder erzeugen, bis Funktion zum Erzeugen für den Nutzer implementiert ist
    const ch357 = new Decoder('357');
    ch357.onReceived = () => {
      this.$store.dispatch('updateLastTimeReceived', Date.now());
    };
    ch357.onTonfolge = tonfolge => {
      this.$store.dispatch('addAlarm', tonfolge);
    };
    this.decoders.push(ch357);
    this.decoders.forEach(decoder => decoder.start());
  },
  watch: {
    '$store.state.theme'(newVal) {
      console.log('watcher');
      newVal == 'dark' ? (this.$vuetify.theme.dark = true) : (this.$vuetify.theme.dark = false);
    }
  }
});
</script>
<style lang="scss">
html {
  overflow: hidden;
}

#app {
  max-height: 100vh;
  height: 100vh;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  min-height: 40px;
  background-color: var(--v-bgPrimary-base);
  border-radius: 8px;
}
::-webkit-scrollbar-track {
  background-color: var(--v-bgSecondary-base);
  border-radius: 8px;
}
::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}

.v-main__wrap {
  border-top-left-radius: 10px;
  background-color: var(--v-bgSecondary-base);
}

.v-sheet:not(.v-list) {
  background-color: var(--v-bgTertiary-base) !important;
}

.v-card__title {
  background-color: var(--v-bgTertiary-base) !important;
}
</style>
