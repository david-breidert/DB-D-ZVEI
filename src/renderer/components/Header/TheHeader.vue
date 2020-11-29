<template>
  <v-system-bar app color="#202225">
    <div class="titleBar-drag-region"></div>
    <v-icon>mdi-message</v-icon>
    <span>10 unread messages</span>
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

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'TheHeader',
  data: () => ({
    appVersion: null
  }),
  methods: {
    closeWindow() {
      ipcRenderer.send('close-window')
    },
    maximizeWindow() {
      ipcRenderer.send('maximize-window')
    },
    minimizeWindow() {
      ipcRenderer.send('minimize-window')
    }
  },
  mounted() {
    ipcRenderer.send('app-version')
    ipcRenderer.on(
      'app-version',
      (event, versionData) => (this.appVersion = versionData.version)
    )
  }
}
</script>

<style lang="scss" scoped>
.titleBar-drag-region {
  top: 5px;
  display: block;
  position: absolute;
  width: calc(100% - 80px);
  height: 15px;
  z-index: -1;
  -webkit-app-region: drag;
}
.v-system-bar {
  padding-right: 0;

  .v-btn {
    min-width: 24px !important;
    width: 24px !important;
    height: 100% !important;
    padding: 0 !important;

    .v-icon {
      margin: 0;
    }

    &:last-child::before {
      color: var(--v-error-base);
    }

    &:last-child:hover::before {
      opacity: 100%;
    }
  }
}
</style>
