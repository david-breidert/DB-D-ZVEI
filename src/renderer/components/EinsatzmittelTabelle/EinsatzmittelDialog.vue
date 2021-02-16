<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title class="headline">
        {{
          changedEm.einsatzmittel
            ? changedEm.einsatzmittel + ' bearbeiten'
            : 'Neues Einsatzmittel'
        }}
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name"
                v-model="changedEm.einsatzmittel"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Tonfolge"
                v-model="changedEm.tonfolge"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="show = false">
          Abbrechen
        </v-btn>
        <v-btn color="primary" text @click="saveEm">
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'EinsatzmittelDialog',
  data: () => ({
    changedEm: {
      _id: null,
      einsatzmittel: null,
      tonfolge: null
    }
  }),
  props: ['dialog', 'em', 'tf'],
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
    saveEm() {
      if (this.em) {
        this.changedEm.tonfolge = this.changedEm.tonfolge
          .split('')
          .map(str => parseInt(str))
        Object.assign(this.em, this.changedEm)
        ipcRenderer.send('editEm', this.changedEm)
      } else {
        this.changedEm.tonfolge = this.changedEm.tonfolge
          .split('')
          .map(str => parseInt(str))
        ipcRenderer.send('addEm', {
          einsatzmittel: this.changedEm.einsatzmittel,
          tonfolge: this.changedEm.tonfolge
        })
        ipcRenderer.once('emAdded', (evt, em) => {
          this.$emit('addEm', em)
        })
      }
      this.show = false
    }
  },
  watch: {
    show(newVal) {
      if (newVal === true) {
        if (this.em) {
          Object.assign(this.changedEm, this.em)
          this.changedEm.tonfolge = this.changedEm.tonfolge
            .toString()
            .replace(/,/g, '')
        } else if (this.tf && !this.em) {
          Object.assign(this.changedEm, {
            _id: null,
            einsatzmittel: null,
            tonfolge: this.tf
          })
          this.changedEm.tonfolge = this.changedEm.tonfolge
            .toString()
            .replace(/,/g, '')
        }
      } else {
        this.changedEm = {
          _id: null,
          einsatzmittel: null,
          tonfolge: null
        }
      }
    }
  }
}
</script>

<style scoped></style>
