<template>
  <v-row class="fill-height">
    <v-col class="fill-height">
      <EinsatzmittelTabelle />
    </v-col>
  </v-row>
</template>
<script>
import EinsatzmittelTabelle from '@/renderer/components/EinsatzmittelTabelle/TheEinsatzmittelTabelle'

export default {
  components: { EinsatzmittelTabelle }
}
</script>
<style lang="scss" scoped></style>
