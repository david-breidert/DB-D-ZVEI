<template>
  <v-app>
    <v-main>
      {{$store.state.currentFrequency}}
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Decoder from './utils/decoder/decoder'

export default Vue.extend({
  name: "App",

  data: () => ({
    decoders: new Array<Decoder>()
  }),
  mounted() {
    const ch357 = new Decoder('357') 
    this.decoders.push(ch357)

    this.decoders.forEach(decoder => decoder.start())
  }
});
</script>
