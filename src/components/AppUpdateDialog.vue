<template>
  <v-bottom-sheet persistent v-model="updateAvailable" inset>
    <v-sheet class="text-center" height="100px">
      <div style="height: 40px">
        <v-expand-x-transition>
          <v-progress-linear v-if="downloading" height="30px" color="primary" :value="downloadProgress"></v-progress-linear>
        </v-expand-x-transition>
        <div v-if="!downloading" style="height: 40px; line-height: 40px" class=" align-center ">
          Eine neue Version ist verfügbar!
        </div>
      </div>
      <div class="d-flex justify-center align-center" style="height: 60px;">
        <v-fade-transition mode="out-in">
          <div v-if="!downloading" key="buttons">
            <v-btn text large color="primary" @click="installUpdate()">
              Update installieren
            </v-btn>
            <v-btn text large color="error" @click="updateAvailable = !updateAvailable">
              schließen
            </v-btn>
          </div>
          <div v-else key="dl">
            Lade herunter...
          </div>
        </v-fade-transition>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import { ipcRenderer } from 'electron';
export default Vue.extend({
  name: 'AppUpdateDialog',
  data: () => ({
    updateAvailable: false,
    downloading: false,
    downloadProgress: 0
  }),
  methods: {
    installUpdate() {
      ipcRenderer.send('install-update');
      this.downloading = true;
    }
  },
  mounted() {
    ipcRenderer.on('checking-for-update', () => console.log('Checking for application update'));
    ipcRenderer.on('update-available', () => {
      console.log('An update is available');
      this.updateAvailable = true;
    });
    ipcRenderer.on('checking-for-update', () => console.log('The application is up to date'));
    ipcRenderer.on('download-progress', (event, progressData) => {
      console.log(progressData);
      this.downloadProgress = progressData.percent;
      console.log('Lade herunter: ' + progressData.percent);
    });
  }
});
</script>

<style lang="scss" scoped></style>
