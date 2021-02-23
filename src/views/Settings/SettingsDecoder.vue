<template>
  <v-sheet class="fill-height" rounded>
    <v-row>
      <v-col v-for="decoder in getAllDecoders" :key="decoder.kanal" cols="auto">
        <v-card class="ma-2" outlined>
          <v-card-title class="justify-center">Kanal {{ decoder.kanal }}</v-card-title>
          <v-list class="transparent">
            <v-list-item>
              <v-list-item-title>{{ decoder.running ? 'Aktiv' : 'Inaktiv' }}</v-list-item-title>
              <v-switch :input-value="decoder.running" @change="switchChange($event, decoder)"></v-switch>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Aufnahmegerät</v-list-item-title>
              <v-select hide-details dense :items="inputDevices" item-text="label"></v-select>
            </v-list-item>
            <v-list-item>
              <v-btn block color="error">Decoder löschen<v-icon right>mdi-delete</v-icon></v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts">
import Decoder from '@/utils/decoder/decoder';
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  data: () => ({
    inputDevices: new Array<MediaDeviceInfo>()
  }),
  computed: {
    ...mapGetters(['getAllDecoders'])
  },
  methods: {
    switchChange(event: unknown, decoder: Decoder): void {
      console.log(decoder.running);

      decoder.running ? decoder.stop() : decoder.start();
    }
  },
  async mounted() {
    this.inputDevices = await (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind == 'audioinput' && d.deviceId != 'default');
  }
});
</script>
