<template>
  <v-row class="fill-height">
    <v-col class="fill-height">
      <AlarmListe />
    </v-col>
  </v-row>
</template>

<script>
import AlarmListe from '@/renderer/components/AlarmListe/TheAlarmListe'

export default {
  components: { AlarmListe }
}
</script>
