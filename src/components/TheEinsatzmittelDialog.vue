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
              <v-text-field label="Name" v-model="changedEm.name"></v-text-field>
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
import Decoder from '@/utils/decoder/decoder';
import { Einsatzmittel, ValidatedTonfolge } from '@/types';

export default Vue.extend({
  name: 'EinsatzmittelDialog',
  data: () => ({
    changedEm: {
      _id: '',
      name: '',
      kanal: '',
      tonfolge: '' as Array<number | string> | string
    }
  }),
  props: {
    dialog: { type: Boolean, required: true },
    em: { required: false },
    tf: { type: Array, required: false },
    kanal: String
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
      const decoder: Decoder = this.$store.getters.getDecoderByKanal(this.kanal);
      if (typeof this.changedEm.tonfolge == 'string') {
        this.changedEm.tonfolge = this.changedEm.tonfolge.split('').map((str: string) => parseInt(str));
      }
      if (this.em) {
        decoder.db.editEm(this.changedEm as Einsatzmittel);
      } else {
        decoder.db.addEm({ name: this.changedEm.name, kanal: this.kanal, tonfolge: this.changedEm.tonfolge as ValidatedTonfolge });
      }
      this.show = false;
      this.$store.dispatch('updateEinsatzmittelCollection');
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
            name: null,
            kanal: this.kanal,
            tonfolge: this.tf
          });
          this.changedEm.tonfolge = this.changedEm.tonfolge.toString().replace(/,/g, '');
        } else {
          Object.assign(this.changedEm, {
            name: null,
            kanal: this.kanal,
            tonfolge: null
          });
        }
      } else {
        this.changedEm = {
          name: '',
          kanal: this.kanal,
          tonfolge: ''
        };
      }
    }
  }
});
</script>
