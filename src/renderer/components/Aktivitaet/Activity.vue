<template>
  <v-sheet
    class="fill-height elevation-2 d-flex flex-column justify-space-around"
    rounded
  >
    <div class="text-center">
      <v-btn
        :class="{
          glow: !currentlyReceiving,
          glow__receiving: currentlyReceiving
        }"
        :color="btnColor"
        fab
        x-large
      >
        <v-icon>mdi-microphone</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      now: Date.now()
    }
  },
  computed: {
    ...mapGetters(['getLastTimeReceived']),
    currentlyReceiving() {
      return this.now - this.getLastTimeReceived < 1500
    },
    btnColor() {
      if (!this.currentlyReceiving) {
        return this.$vuetify.theme.themes.dark.secondary
      } else {
        return this.$vuetify.theme.themes.dark.primary
      }
    }
  },
  mounted() {
    this.updateData()
  },
  methods: {
    updateData() {
      this.now = Date.now()
      window.requestAnimationFrame(this.updateData)
    }
  }
}
</script>

<style lang="scss">
.glow {
  &__receiving {
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(#2196f3, 1);
    transform: scale(1);
    animation: pulseBlue 3s infinite;
  }
}

@keyframes pulseBlue {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(#2196f3, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 40px rgba(#2196f3, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(#2196f3, 0);
  }
}
</style>
