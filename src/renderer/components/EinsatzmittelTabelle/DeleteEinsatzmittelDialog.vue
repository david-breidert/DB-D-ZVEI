<template>
  <v-dialog v-model="show" width="50vw">
    <v-card>
      <v-card-title class="headline">
        <p style="word-break: keep-all;">
          Wollen Sie {{ em ? em.einsatzmittel : '' }} wirklich löschen?
        </p>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="show = false">
          Abbrechen
        </v-btn>
        <v-btn color="error" text @click="deleteEm">
          Löschen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'DeleteEinsatzmittelDialog',
  props: ['dialog', 'em'],
  computed: {
    show: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    deleteEm() {
      console.log(this.em)
      ipcRenderer.send('deleteEm', this.em)
      this.$emit('deleteEm', this.em)
      this.show = false
    }
  }
}
</script>

<style scoped></style>
