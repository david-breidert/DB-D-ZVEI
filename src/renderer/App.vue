<template>
  <v-app>
    <TheHeader />
    <TheSideBar />
    <v-main>
      <v-container fluid class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
    <TheUpdateDialog />
  </v-app>
</template>

<script>
import TheUpdateDialog from '@/renderer/components/TheUpdateDialog'
import TheHeader from '@/renderer/components/Header/TheHeader'
import TheSideBar from '@/renderer/components/Sidebar/TheSideBar'

export default {
  name: 'App',
  data: () => ({}),
  components: {
    TheHeader,
    TheSideBar,
    TheUpdateDialog
  }
}
</script>
<style lang="scss">
.v-application--wrap {
  background-color: $bg_primary;
}
::-webkit-scrollbar {
  display: none;
}
.v-main__wrap {
  border-top-left-radius: 10px;
  background-color: $bg_secondary;
}
</style>
