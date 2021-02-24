<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title class="headline">
        Neuer Decoder
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Kanal" v-model="kanal"></v-text-field>
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
        <v-btn color="primary" text @click="saveDecoder">
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Decoder from '@/utils/decoder/decoder';

export default Vue.extend({
  name: 'DecoderDialog',
  data: () => ({
    kanal: ''
  }),
  props: {
    dialog: { type: Boolean, required: true }
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
    saveDecoder() {
      if (this.kanal) {
        const d = new Decoder(this.kanal);
        this.$store.dispatch('addDecoder', d);
        this.kanal = '';
        this.show = false;
      }
    }
  }
});
</script>
