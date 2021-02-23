<template>
  <v-row class="fill-height">
    <v-col class="fill-height">
      <SettingsDecoder />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import SettingsDecoder from './SettingsDecoder.vue';

export default {
  components: {
    SettingsDecoder
  }
};
</script>
<style lang="scss" scoped></style>
