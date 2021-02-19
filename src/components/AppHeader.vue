<template>
  <v-system-bar class="px-0" :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].bgPrimary" app>
    <!-- color="#202225" -->
    <div class="resize-handle top"></div>
    <div class="resize-handle left"></div>
    <div style="width: 56px" class="text-center">
      <span>{{ appVersion }}</span>
    </div>
    <v-spacer></v-spacer>
    <span>ZVEI - Decoder</span>
    <v-spacer></v-spacer>
    <div class="fill-height">
      <v-btn text tile @click="minimizeWindow()">
        <v-icon x-small>mdi-minus</v-icon>
      </v-btn>
      <v-btn text tile @click="maximizeWindow()">
        <v-icon x-small>mdi-checkbox-blank-outline</v-icon>
      </v-btn>
      <v-btn text tile @click="closeWindow()">
        <v-icon x-small>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-system-bar>
</template>

<script lang="ts">
import { ipcRenderer, remote } from 'electron';
import Vue from 'vue';

export default Vue.extend({
  name: 'AppHeader',
  data: () => ({
    appVersion: ''
  }),
  methods: {
    closeWindow() {
      ipcRenderer.send('close-window');
    },
    maximizeWindow() {
      ipcRenderer.send('maximize-window');
    },
    minimizeWindow() {
      ipcRenderer.send('minimize-window');
    }
  },
  mounted() {
    this.appVersion = remote.app.getVersion();
  }
});
</script>

<style lang="scss" scoped>
.v-system-bar {
  padding-right: 0;
  -webkit-app-region: drag;

  .resize-handle {
    position: absolute;
    top: 0px;
    left: 0px;
    -webkit-app-region: no-drag;
    &.top {
      width: 100%;
      height: 3px;
    }
    &.left {
      width: 3px;
      height: 100%;
    }
  }

  .v-btn {
    min-width: 24px !important;
    width: 24px !important;
    height: 100% !important;
    padding: 0 !important;
    -webkit-app-region: no-drag;
    .v-icon {
      margin: 0;
    }

    &:last-child::before {
      color: var(--v-error-base);
    }

    &:last-child:hover::before {
      opacity: 0.8;
    }
  }
}
</style>
