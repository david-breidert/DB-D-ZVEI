<template>
  <v-row class="fill-height">
    <v-col cols="12">
      <DashboardAlarmListe />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue';
import DashboardAlarmListe from './DashboardAlarmListe.vue';

export default Vue.extend({
  name: 'Dashboard',
  components: {
    DashboardAlarmListe
  }
});
</script>
