<template>
  <v-sheet class="fill-height elevation-3" rounded>
    <v-data-table
      :headers="headers"
      :items="getDataTableEm"
      :loading="loading"
      loading-text="Lade Einsatzmittel"
      item-key="_id"
      dense
      fixed-header
      :search="search"
      :custom-filter="searchFilter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      hide-default-footer
      must-sort
      disable-pagination
      class="transparent mx-2"
    >
      <template v-slot:top>
        <v-row no-gutters class="flex-nowrap">
          <v-col class="d-flex justify-center align-center">
            <v-select hide-details dense v-model="selectedKanal" :items="getAllDecoders" item-text="kanal" solo flat></v-select>
          </v-col>
          <v-col md="9" sm="8">
            <v-text-field v-model="search" id="search" :append-icon="search ? '' : 'mdi-magnify'" hide-details dense solo flat clearable class="ma-3"> </v-text-field>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-btn @click.stop="newEmDialog" text>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item="{ item }">
        <tr @dblclick="editEmDialog(item)" :key="item._id">
          <td>{{ item.name }}</td>
          <td>{{ item.tonfolge.toString().replace(/,/g, '') }}</td>
          <td>
            <v-icon small class="mr-2" @click.stop="editEmDialog(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteEmDialog(item)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-form>
      <v-text-field></v-text-field>
      <v-text-field></v-text-field>
      <v-text-field></v-text-field>
    </v-form>
    <TheEinsatzmittelDialog v-model="dialog" :dialog="dialog" :kanal="selectedKanal" :em="selectedEm" @addEm="addEm"></TheEinsatzmittelDialog>
    <TheDeleteEinsatzmittelDialog v-model="deleteDialog" :dialog="deleteDialog" :kanal="selectedKanal" :em="selectedEm" @deleteEm="deleteEM"></TheDeleteEinsatzmittelDialog>
  </v-sheet>
</template>

<script lang="ts">
import TheEinsatzmittelDialog from '@/components/TheEinsatzmittelDialog.vue';
import TheDeleteEinsatzmittelDialog from '@/components/TheDeleteEinsatzmittelDialog.vue';
import { mapGetters } from 'vuex';
import Decoder from '@/utils/decoder/decoder';
import { Einsatzmittel } from '@/types';
import Vue from 'vue';

export default Vue.extend({
  name: 'EinsatzmittelTabelle',
  components: { TheDeleteEinsatzmittelDialog, TheEinsatzmittelDialog },
  data: () => ({
    headers: [
      { text: 'Einsatzmittel', value: 'name' },
      { text: 'Fünftonfolge', value: 'tonfolge' },
      { text: '', value: 'actions', sortable: false }
    ],
    search: '',
    selectedKanal: '357',
    loading: false,
    sortBy: 'tonfolge',
    sortDesc: false,
    selected: null,
    einsatzmittel: [],
    selectedEm: null as Einsatzmittel | null,
    dialog: false,
    deleteDialog: false
  }),
  computed: {
    ...mapGetters(['getAlleEm', 'getAllDecoders']),
    getDataTableEm(): Array<Einsatzmittel> {
      if (this.getAlleEm) {
        const alleEm = this.getAlleEm[this.getAlleEm.findIndex((o: Einsatzmittel) => o.kanal == this.selectedKanal)];
        if (alleEm) {
          return alleEm.einsatzmittel;
        } else return [];
      } else {
        return [];
      }
    }
  },
  methods: {
    newEmDialog() {
      this.selectedEm = null;
      this.dialog = true;
    },
    editEmDialog(item: Einsatzmittel) {
      this.selectedEm = item;
      this.dialog = true;
    },
    deleteEmDialog(item: Einsatzmittel) {
      this.selectedEm = item;
      this.deleteDialog = true;
    },
    addEm(newEm: Einsatzmittel) {
      const decoder: Decoder = this.$store.getters.getDecoderByKanal(this.selectedKanal);
      decoder.db.addEm(newEm);
    },
    editEm(emToEdit: Einsatzmittel) {
      const decoder: Decoder = this.$store.getters.getDecoderByKanal(this.selectedKanal);
      decoder.db.editEm(emToEdit);
    },
    deleteEM(emToDelete: Einsatzmittel) {
      const decoder: Decoder = this.$store.getters.getDecoderByKanal(this.selectedKanal);
      decoder.db.deleteEm(emToDelete);
    },
    searchFilter(value: string | object, search: string) {
      if (value && search) {
        if (typeof value === 'string') {
          return value.indexOf(search) !== -1;
        } else {
          const searchMatch = search.match(/.{1}/g);
          if (searchMatch) {
            return value.toString().indexOf(searchMatch.join(',')) !== -1;
          }
        }
      }
    }
  },
  created() {
    this.$store.dispatch('updateEinsatzmittelCollection');
  }
});
</script>

<style lang="scss" scoped>
.v-data-table {
  height: 100%;
  overflow: auto;
  overflow-x: visible;
}
.row {
  width: 100%;
  margin-right: 0;
  margin-left: 0;
}

.v-icon.v-icon:focus::after {
  opacity: 0;
}
.v-icon.v-icon:hover::after {
  opacity: 0.24;
}
.v-btn .v-icon.v-icon:hover::after {
  opacity: 0;
}

::v-deep .v-data-table__wrapper {
  height: calc(100% - 64px);
}

::v-deep .v-data-table.v-data-table--fixed-header thead {
  th {
    background-color: var(--v-bgTertiary-base) !important;
  }
}

.v-data-table td {
  border-bottom: none !important;
}

::v-deep .v-data-table .v-input__slot {
  background-color: var(--v-bgQuarternary-base) !important;
}

::v-deep ::-webkit-scrollbar-track {
  margin-top: 38px;
  margin-bottom: 5px;
}

::v-deep .v-btn:focus::before {
  opacity: 0;
}
</style>
