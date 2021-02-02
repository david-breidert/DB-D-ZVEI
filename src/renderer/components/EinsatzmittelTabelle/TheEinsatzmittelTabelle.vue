<template>
  <v-sheet class="fill-height elevation-3" rounded>
    <v-data-table
      :headers="headers"
      :items="einsatzmittel"
      :loading="loading"
      item-key="_id"
      dense
      fixed-header
      :search="search"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      hide-default-footer
      must-sort
      disable-pagination
      class="transparent ma-2"
    >
      <template v-slot:top>
        <v-row no-gutters class="flex-nowrap">
          <v-col md="11" sm="10">
            <v-text-field
              v-model="search"
              id="search"
              :append-icon="search ? '' : 'mdi-magnify'"
              hide-details
              dense
              color="white"
              :background-color="variables.bg_quarternary"
              solo
              flat
              clearable
              class="ma-3"
            >
            </v-text-field>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-btn @click.stop="newEmDialog" text></v-btn>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item="{ item }">
        <tr @dblclick="editEmDialog(item)" :key="item._id">
          <td>{{ item.einsatzmittel }}</td>
          <td>{{ item.tonfolge.toString().replace(/,/g, ' - ') }}</td>
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
    <EinsatzmittelDialog
      v-model="dialog"
      :dialog="dialog"
      :em="selectedEm"
      @addEm="addEm"
    ></EinsatzmittelDialog>
    <DeleteEinsatzmittelDialog
      v-model="deleteDialog"
      :dialog="deleteDialog"
      :em="selectedEm"
      @deleteEm="deleteEM"
    ></DeleteEinsatzmittelDialog>
  </v-sheet>
</template>

<script>
import variables from '../../styles/_variables.scss'
import EinsatzmittelDialog from '@/renderer/components/EinsatzmittelTabelle/EinsatzmittelDialog'
import DeleteEinsatzmittelDialog from '@/renderer/components/EinsatzmittelTabelle/DeleteEinsatzmittelDialog'

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
    einsatzmittel: [],
    loading: false,
    sortBy: 'tonfolge',
    sortDesc: false,
    selected: null,
    variables: variables,
    selectedEm: null,
    dialog: false,
    deleteDialog: false
  }),
  methods: {
    newEmDialog() {
      this.selectedEm = null
      this.dialog = true
    },
    editEmDialog(item) {
      this.selectedEm = item
      this.dialog = true
    },
    deleteEmDialog(item) {
      this.selectedEm = item
      this.deleteDialog = true
    },
    addEm(newEm) {
      this.einsatzmittel.push(newEm)
    },
    deleteEM(deletedEm) {
      let indexToDelete = this.einsatzmittel.findIndex(
        em => em._id === deletedEm._id
      )
      console.log(indexToDelete)
      this.einsatzmittel.splice(indexToDelete, 1)
    }
  },
  async mounted() {
    this.einsatzmittel = this.$store.getters.getEinsatzmittel
  },
  beforeDestroy() {
    this.$store.dispatch('updateEinsatzmittel', this.einsatzmittel)
  }
}
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

.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row) {
  border-bottom: none;
}

.v-icon.v-icon::after {
  background-color: transparent;
}

::v-deep .v-data-table__wrapper {
  height: calc(100% - 64px);
}

::v-deep .v-input__icon--append .v-icon {
  color: grey;
}

::v-deep .theme--dark.v-data-table.v-data-table--fixed-header thead {
  th {
    background-color: $bg_tertiary;
    // box-shadow: none;
  }
}

::v-deep ::-webkit-scrollbar-track {
  margin-top: 38px;
  margin-bottom: 5px;
}

.theme--dark.v-btn:focus::before {
  opacity: 0;
}
</style>
