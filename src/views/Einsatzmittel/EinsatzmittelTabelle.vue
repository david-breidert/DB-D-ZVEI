<template>
  <v-sheet class="fill-height elevation-3" rounded>
    <v-data-table
      :headers="headers"
      :items="einsatzmittel"
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
          <v-col md="11" sm="10">
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
          <td>{{ item.einsatzmittel }}</td>
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
    <EinsatzmittelDialog v-model="dialog" :dialog="dialog" :em="selectedEm" @addEm="addEm"></EinsatzmittelDialog>
    <DeleteEinsatzmittelDialog v-model="deleteDialog" :dialog="deleteDialog" :em="selectedEm" @deleteEm="deleteEM"></DeleteEinsatzmittelDialog>
  </v-sheet>
</template>

<script>
import EinsatzmittelDialog from '@/components/TheEinsatzmittelDialog';
import DeleteEinsatzmittelDialog from '@/components/TheDeleteEinsatzmittelDialog';
import { ipcRenderer } from 'electron';

export default {
  name: 'EinsatzmittelTabelle',
  components: { DeleteEinsatzmittelDialog, EinsatzmittelDialog },
  data: () => ({
    headers: [
      { text: 'Einsatzmittel', value: 'einsatzmittel' },
      { text: 'Fünftonfolge', value: 'tonfolge' },
      { text: '', value: 'actions', sortable: false }
    ],
    search: '',
    loading: false,
    sortBy: 'tonfolge',
    sortDesc: false,
    selected: null,
    einsatzmittel: [],
    selectedEm: null,
    dialog: false,
    deleteDialog: false
  }),
  computed: {
    stateEMs() {
      return this.$store.getters.getEinsatzmittel;
    }
  },
  methods: {
    newEmDialog() {
      this.selectedEm = null;
      this.dialog = true;
    },
    editEmDialog(item) {
      this.selectedEm = item;
      this.dialog = true;
    },
    deleteEmDialog(item) {
      this.selectedEm = item;
      this.deleteDialog = true;
    },
    addEm(newEm) {
      this.einsatzmittel.push(newEm);
    },
    deleteEM(deletedEm) {
      const indexToDelete = this.einsatzmittel.findIndex(em => em._id === deletedEm._id);
      console.log(indexToDelete);
      this.einsatzmittel.splice(indexToDelete, 1);
    },
    searchFilter(value, search) {
      return value !== '' && search !== '' && ((typeof value === 'string' && value.indexOf(search) !== -1) || (typeof value === 'object' && value.toString().indexOf(search.match(/.{1}/g).join(',')) !== -1));
    }
  },
  async mounted() {
    this.loading = true;
    ipcRenderer.send('getEm', {});
    ipcRenderer.on('postEm', (event, em) => {
      this.loading = false;
      this.einsatzmittel = em;
    });
  },
  beforeDestroy() {
    this.$store.dispatch('updateEinsatzmittel', this.einsatzmittel);
  }
};
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
