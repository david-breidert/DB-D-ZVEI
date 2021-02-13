<template>
  <v-row class="fill-height">
    <v-col
      cols="12"
      md="8"
      lg="9"
      :style="
        $vuetify.breakpoint.smAndDown ? { height: '70%' } : { height: '100%' }
      "
    >
      <AlarmListe />
    </v-col>
    <v-col
      class="d-flex"
      :class="{ 'flex-column': $vuetify.breakpoint.mdAndUp }"
      :style="
        $vuetify.breakpoint.smAndDown ? { height: '30%' } : { height: '100%' }
      "
    >
      <Uhr
        style="flex-basis: 50%"
        :class="{
          'mb-3': $vuetify.breakpoint.mdAndUp,
          'mr-3': $vuetify.breakpoint.smAndDown
        }"
      />
      <Activity
        style="flex-basis: 50%"
        :class="{
          'mt-3': $vuetify.breakpoint.mdAndUp,
          'ml-3': $vuetify.breakpoint.smAndDown
        }"
      />
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
