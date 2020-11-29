<template>
  <div id="titleBar">
    <v-row class="fill-height ma-0">
      <div class="titleBar-drag-region"></div>
      <v-col
        class="pa-0 pl-3 fill-height text-overline"
        style="line-height: 20px"
      >
        DECODER v{{ appVersion }}
      </v-col>
      <v-col class="d-flex justify-end pa-0">
        <v-btn text tile @click="minimizeWindow()">
          <v-icon small>
            mdi-window-minimize
          </v-icon>
        </v-btn>
        <v-btn text tile @click="maximizeWindow()">
          <v-icon small>
            mdi-window-maximize
          </v-icon>
        </v-btn>
        <v-btn text tile @click="closeWindow()">
          <v-icon small>
            mdi-window-close
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'HeaderSystemBar',
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
#titleBar {
  height: 20px;

  .v-btn {
    height: 20px;
    min-width: 20px;
    width: 20px;
  }

  .v-btn:last-child::before {
    color: var(--v-error-base);
  }

  .v-btn:last-child:hover::before {
    opacity: 100%;
  }
}
</style>
