<template>
  <DashboardAlarmListe />
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
