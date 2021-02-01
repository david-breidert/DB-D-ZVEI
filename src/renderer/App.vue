<template>
  <v-app>
    <TheHeader />
    <TheSideBar />
    <v-main class="fill-height">
      <v-container fluid class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
    <TheUpdateDialog />
  </v-app>
</template>

<script>
import TheUpdateDialog from '@/renderer/components/UpdateDialog/TheUpdateDialog'
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
html {
  overflow: hidden;
}
#app {
  max-height: 100vh;
  height: 100vh;
}

//::-webkit-scrollbar {
//  width: 9px;
//  border: 10px solid rgba(0, 0, 0, 0); /* Transparent border together with `background-clip: padding-box` does the trick */
//}
//::-webkit-scrollbar-thumb {
//  background: #202225;
//  border-radius: 15px;
//  border: 0.5px solid rgba(0, 0, 0, 0); /* Transparent border together with `background-clip: padding-box` does the trick */
//  background-clip: padding-box;
//}
//::-webkit-scrollbar-thumb:hover {
//  background: #202225;
//}
//::-webkit-scrollbar-track {
//  background: #2f3338;
//  border-radius: 10px;
//}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  //border: 4px solid transparent;
  //background-clip: padding-box;
  min-height: 40px;
  background-color: #202225;
  border-radius: 8px;
}
::-webkit-scrollbar-track {
  //border: 4px solid transparent;
  //background-clip: padding-box;
  background-color: #2f3338;
  border-radius: 8px;
}
::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}

.v-application--wrap {
  background-color: $bg_primary;
}
.v-main__wrap {
  border-top-left-radius: 10px;
  background-color: $bg_secondary;
}

.v-sheet:not(.v-list) {
  background-color: $bg_tertiary !important;
}

.v-card__title {
  background-color: $bg_tertiary !important;
}
</style>
