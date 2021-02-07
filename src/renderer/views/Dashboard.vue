<template>
  <v-row class="fill-height">
    <v-col cols="8" class="fill-height">
      <AlarmListe />
    </v-col>
    <v-col class="fill-height d-flex flex-column">
      <Uhr class="mb-3" />
      <Activity class=" mt-3" />
    </v-col>
  </v-row>
</template>

<script>
import AlarmListe from '@/renderer/components/AlarmListe/TheAlarmListe'
import Uhr from '@/renderer/components/Uhr/Uhr'
import Activity from '@/renderer/components/Aktivitaet/Activity'

export default {
  components: { AlarmListe, Uhr, Activity }
}
</script>
<style lang="scss" scoped>
.row {
  width: 100%;
}
</style>
