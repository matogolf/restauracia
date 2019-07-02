<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Prihlásený zamestnanec:</h1>
        <h2>{{ employee.name }} {{ employee.surname }}</h2>

      <template>
          <v-data-table
            :headers="headers"
            :items="tables"
            hide-actions
            class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name + " č." + props.item.id }}</td>         
              <td class="text-xs-center">{{ props.item.customersCount }}</td>
              <td class="text-xs-center">{{ props.item.seatCount }}</td>
              <td>
                <v-btn 
                  @click="transfer(props.item)">
                  <v-icon>restaurant</v-icon>
              </v-btn></td>
            </template>
          </v-data-table>
        </template>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  cursor: pointer;
  width: 20vh;
}
h1, h2 {
  font-weight: normal;
  margin: 5vh;
}
</style>

<script>
import store from '@/services/store'
import TableServices from '@/services/TableServices'

export default {
  data () {
    return {
      employee: JSON.parse(store.getValue('employee')),
      tables: [],
      headers: [
        {text: 'Číslo stola', value: 'name'},
        {text: 'Obsadenosť', value: 'customersCount'},
        {text: 'Počet miest', value: 'seatCount'},
        {text: 'Zvoliť', value: ' '}
      ]
    }
  },
  methods: {
    async loadTables () {
      try {
        const response = await TableServices.tablesView({time: new Date()})
        this.tables = response.data
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    async transfer (table) {
      this.$router.push({name: 'manageTable', params: { table: table }})
    }
  },
  beforeMount () {
    this.loadTables()
  }
}
</script>