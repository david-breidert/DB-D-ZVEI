<template>
  <v-sheet class="fill-height" rounded>
    <v-row>
      <v-col v-for="decoder in getAllDecoders" :key="decoder.kanal" cols="12" lg="6" xl="4">
        <v-card class="ma-2" outlined>
          <v-card-title class="justify-center">Kanal {{ decoder.kanal }}</v-card-title>
          <v-list class="transparent">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ decoder.running ? 'Aktiv' : 'Inaktiv' }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="justify-center">
                <v-switch :disabled="!decoder.inputId" :input-value="decoder.running" @change="switchChange($event, decoder)"></v-switch>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Aufnahmegerät</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-select outlined hide-details dense :value="decoder.inputId" @change="deviceChange($event, decoder)" :items="inputDevices" item-value="deviceId" item-text="label"></v-select>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-btn block outlined color="error">Decoder löschen<v-icon right>mdi-delete</v-icon></v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" xl="4" v-if="getAllDecoders.length < 2">
        <v-row>
          <v-col class="mx-6"> <v-btn x-large block outlined>ADD DECODER</v-btn></v-col>
        </v-row>
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
      event == false ? decoder.stop() : decoder.start();
    },
    deviceChange(micId: string, decoder: Decoder) {
      if (decoder.running) {
        decoder.stop();
        decoder.inputId = micId;
        decoder.start();
      } else {
        decoder.inputId = micId;
      }
    },
    deleteDecoder(decoder: Decoder) {
      this.$store.dispatch('removeDecoder', decoder);
      decoder.db.deleteDB();
    }
  },
  async mounted() {
    this.inputDevices = await (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind == 'audioinput' && d.deviceId != 'default');
  }
});
</script>
<style lang="scss" scoped>
.v-list-item {
  .v-list-item__action {
    width: 50%;
  }
  .v-list-item__content {
    width: 50%;
  }
}
</style>
