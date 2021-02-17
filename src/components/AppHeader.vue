<template>
  <v-system-bar app>
    <!-- color="#202225" -->
    <div class="resize-handle top"></div>
    <div class="resize-handle left"></div>
    <div class="d-flex justify-space-between">
      <span>{{ appVersion }}</span>
    </div>
    <v-spacer></v-spacer>
    <span>ZVEI - Decoder</span>
    <v-spacer></v-spacer>
    <v-btn text tile @click="minimizeWindow()">
      <v-icon x-small>mdi-minus</v-icon>
    </v-btn>
    <v-btn text tile @click="maximizeWindow()">
      <v-icon x-small>mdi-checkbox-blank-outline</v-icon>
    </v-btn>
    <v-btn text tile @click="closeWindow()">
      <v-icon x-small>mdi-close</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script lang="ts">
import { ipcRenderer, remote } from 'electron';
import Vue from 'vue';

export default Vue.extend({
  name: 'TheHeader',
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
