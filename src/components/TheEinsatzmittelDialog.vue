<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title class="headline">
        {{ changedEm.einsatzmittel ? changedEm.einsatzmittel + ' bearbeiten' : 'Neues Einsatzmittel' }}
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Name" v-model="changedEm.einsatzmittel"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Tonfolge" v-model="changedEm.tonfolge"></v-text-field>
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

<script lang="ts">
import Vue from 'vue';
import { ipcRenderer } from 'electron';

export default Vue.extend({
  name: 'EinsatzmittelDialog',
  data: () => ({
    changedEm: {
      _id: '',
      einsatzmittel: '',
      tonfolge: [] as Array<number | string> | string
    }
  }),
  props: {
    dialog: { type: Boolean, required: true },
    em: { required: false },
    tf: { type: Array, required: false }
  },
  computed: {
    show: {
      get(): boolean {
        return this.dialog;
      },
      set(value: boolean): void {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    saveEm() {
      if (typeof this.changedEm.tonfolge == 'string') {
        this.changedEm.tonfolge = this.changedEm.tonfolge.split('').map((str: string) => parseInt(str));
      }
      if (this.em) {
        Object.assign(this.em, this.changedEm);
        ipcRenderer.send('editEm', this.changedEm);
      } else {
        ipcRenderer.send('addEm', {
          einsatzmittel: this.changedEm.einsatzmittel,
          tonfolge: this.changedEm.tonfolge
        });
      }
      this.show = false;
      ipcRenderer.send('getEm');
    }
  },
  watch: {
    show(newVal) {
      if (newVal === true) {
        if (this.em) {
          Object.assign(this.changedEm, this.em);
          this.changedEm.tonfolge = this.changedEm.tonfolge.toString().replace(/,/g, '');
        } else if (this.tf && !this.em) {
          Object.assign(this.changedEm, {
            _id: null,
            einsatzmittel: null,
            tonfolge: this.tf
          });
          this.changedEm.tonfolge = this.changedEm.tonfolge.toString().replace(/,/g, '');
        }
      } else {
        this.changedEm = {
          _id: '',
          einsatzmittel: '',
          tonfolge: ''
        };
      }
    }
  }
});
</script>
