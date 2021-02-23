<template>
  <v-dialog v-model="show" width="50vw">
    <v-card>
      <v-card-title class="headline">
        <p style="word-break: keep-all;">Wollen Sie {{ em ? em.name : '' }} wirklich löschen?</p>
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

<script lang="ts">
import Decoder from '@/utils/decoder/decoder';
import Vue from 'vue';

export default Vue.extend({
  name: 'DeleteEinsatzmittelDialog',
  props: ['dialog', 'em', 'kanal'],
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
    deleteEm() {
      const decoder: Decoder = this.$store.getters.getDecoderByKanal(this.kanal);
      console.log(this.em);
      decoder.db.deleteEm(this.em);
      this.show = false;
      this.$store.dispatch('updateEinsatzmittelCollection');
    }
  }
});
</script>

<style scoped></style>
