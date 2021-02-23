<template>
  <v-navigation-drawer :mini-variant="mini" floating permanent app width="200" :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].bgPrimary">
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" :to="item.route">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content
          ><v-list-item-title> {{ item.title }}</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list dense class="pb-0">
        <v-list-item @click="changeTheme">
          <v-list-item-icon>
            <v-icon>{{ $vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $vuetify.theme.dark ? 'Heller Modus' : 'Dunkler Modus' }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="mini = !mini">
          <v-list-item-icon>
            <v-icon>{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Schließen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import settings from 'electron-settings';
import EinsatzmittelDatenbank from '../views/Einsatzmittel/Einsatzmittel.vue';

export default Vue.extend({
  name: 'AppSideBar',
  data: () => ({
    appVersion: null,
    mini: true,
    items: [
      {
        title: 'Dashboard',
        route: { path: '/', component: Dashboard },
        icon: 'mdi-monitor-dashboard'
      },
      { title: 'Einsatzmittel', route: { path: '/einsatzmittel', component: EinsatzmittelDatenbank }, icon: 'mdi-database' },
      { title: 'Settings', route: { path: '/settings', component: EinsatzmittelDatenbank }, icon: 'mdi-cog' }
    ]
  }),
  methods: {
    async changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      await settings.set('darkMode', this.$vuetify.theme.dark);
    }
  }
});
</script>

<style scoped></style>
