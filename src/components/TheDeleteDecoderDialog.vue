<template>
  <v-dialog v-model="show" width="50vw">
    <v-card>
      <v-card-title class="headline">
        <p style="word-break: keep-all;">Wollen Sie {{ decoder ? decoder.kanal : '' }} wirklich löschen?</p>
      </v-card-title>
      <v-card-text>
        <v-container>
          Wenn Sie bestätigen wird die komplette Einsatzmitteldatenbank dieses Decoders unwiderruflich gelöscht.
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="show = false">
          Abbrechen
        </v-btn>
        <v-btn color="error" text @click="deleteDecoder(decoder)">
          Löschen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Decoder from '@/utils/decoder/decoder';
import Vue from 'vue';

export default Vue.extend({
  name: 'DeleteDecoderDialog',
  props: ['decoder', 'dialog'],
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
    deleteDecoder(decoder: Decoder) {
      this.$store.dispatch('removeDecoder', decoder);
      decoder.db.deleteDB();
      this.show = false;
    }
  }
});
</script>

<style scoped></style>
