<template>
  <v-navigation-drawer
    :mini-variant="mini"
    floating
    permanent
    app
    color="#202225"
    width="200"
  >
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" :to="item.component">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content
          ><v-list-item-title>
            {{ item.title }}</v-list-item-title
          ></v-list-item-content
        >
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list dense class="pb-0">
        <v-list-item @click="mini = !mini">
          <v-list-item-icon>
            <v-icon>{{
              mini ? 'mdi-chevron-right' : 'mdi-chevron-left'
            }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Schließen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'TheSideBar',
  data: () => ({
    appVersion: null,
    mini: true,
    items: [
      {
        title: 'Dashboard',
        component: 'Dashboard',
        icon: 'mdi-monitor-dashboard'
      },
      { title: 'Einstellungen', component: 'Settings', icon: 'mdi-cog' }
    ]
  })
}
</script>

<style scoped></style>
