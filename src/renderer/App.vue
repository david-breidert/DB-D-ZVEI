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
import {
  getUserAudio,
  createContext,
  getCurrentFrequencyFft
} from './helpers/audio'
import { getTonNummer, getValidatedTonfolge } from './helpers/zvei'
import { ipcRenderer } from 'electron'

export default {
  name: 'App',
  data: () => ({
    context: null,
    analyser: null,
    tonFolgeGesamt: [],
    zeitSeitLetztemTon: 0,
    timoutTime: 10,
    minTonCount: 3,
    maxTonCount: 11,
    intervallCheck: null
  }),
  components: {
    TheHeader,
    TheSideBar,
    TheUpdateDialog
  },
  async mounted() {
    const audioStream = await getUserAudio()
    const { sfx, analyser } = await createContext(audioStream)
    this.context = sfx
    this.analyser = analyser

    ipcRenderer.send('getEm', {})

    ipcRenderer.on('postEm', (event, em) => {
      this.$store.dispatch('updateEinsatzmittel', em)
    })

    setInterval(() => {
      this.updateData()
    }, this.timoutTime)
  },
  methods: {
    updateData() {
      const currentFrequency = getCurrentFrequencyFft(
        this.context,
        this.analyser
      )
      // this.$store.dispatch('updateCurrentFrequency', currentFrequency)
      if (currentFrequency !== -1) {
        this.$store.dispatch('updateLastTimeReceived', Date.now())
        const currentTon = getTonNummer(currentFrequency)
        if (currentTon !== -1) {
          this.tonFolgeGesamt.push(currentTon)
          this.zeitSeitLetztemTon = Date.now()
          if (this.tonFolgeGesamt.length === 1) {
            setTimeout(() => {
              console.log(this.tonFolgeGesamt)
              let tonfolge = getValidatedTonfolge(
                this.tonFolgeGesamt,
                this.minTonCount,
                this.maxTonCount
              )
              if (
                tonfolge == null &&
                Date.now() - this.zeitSeitLetztemTon <= 210
              ) {
                this.intervallCheck = setInterval(() => {
                  tonfolge = getValidatedTonfolge(
                    this.tonFolgeGesamt,
                    this.minTonCount,
                    this.maxTonCount
                  )
                  if (tonfolge != null) {
                    console.log('Tonfolge durch IntervallCheck ermittelt:')
                    this.$store.dispatch('addAlarm', tonfolge)
                    console.log(this.$store.state.currentTonfolge)
                    clearInterval(this.intervallCheck)
                    this.tonFolgeGesamt = []
                  } else if (
                    tonfolge == null &&
                    Date.now() - this.zeitSeitLetztemTon > 210
                  ) {
                    clearInterval(this.intervallCheck)
                    this.tonFolgeGesamt = []
                  }
                }, 140)
              } else if (tonfolge != null) {
                console.log('Tonfolge ermittelt:')
                this.$store.dispatch('addAlarm', tonfolge)

                this.tonFolgeGesamt = []
              } else {
                this.tonFolgeGesamt = []
              }
            }, 600)
          }
        }
      }
    }
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
