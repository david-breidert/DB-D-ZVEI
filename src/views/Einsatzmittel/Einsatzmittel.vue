<template>
  <v-row class="fill-height">
    <v-col class="fill-height">
      <EinsatzmittelTabelle />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import EinsatzmittelTabelle from './EinsatzmittelTabelle.vue';

export default {
  components: {
    EinsatzmittelTabelle
  }
};
</script>
<style lang="scss" scoped></style>
