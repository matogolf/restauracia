<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img class="logoW" src="@/assets/logo.png" alt="Vuetify.js">
        
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
                  :disabled="!(props.item.seatCount>props.item.customersCount)"
                  @click="cont(props.item.id)">
                  <v-icon>restaurant</v-icon>
              </v-btn></td>
            </template>
          </v-data-table>
        </template>

      <h2>Pre pokračovanie si zvoľte stvôl. </h2>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logoW{
  width: 40vh;
  margin-left: 30px;
}
h1, h2 {
  font-weight: normal;
  margin: 5vh;
}
</style>

<script>
import TableServices from '@/services/TableServices'
import CustomerServices from '@/services/CustomerServices'
import store from '@/services/store'

export default {
  data () {
    return {
      tables: [],
      headers: [
        {text: 'Číslo stola', value: 'name'},
        {text: 'Obsadenosť', value: 'customersCount'},
        {text: 'Počet miest', value: 'seatCount'},
        {text: 'Prisadnúť', value: ' '}
      ]
    }
  },
  methods: {
    async cont (tableId) {
      if (!store.getCustomer()) {
        try {
          const response = await CustomerServices.newCustomer({tableId: tableId})
          store.newCustomer(response.data)
        } catch (error) {
          if (error.response) {
            console.log(error.response.data)
          }
        }
      }
      this.$router.push({name: 'main'})
    },
    async loadTables () {
      try {
        const response = await TableServices.tablesView({time: new Date()})
        this.tables = response.data
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    }
  },
  beforeMount () {
    if (store.getCustomer()) {
      this.$router.push({name: 'main'})
    }
    this.loadTables()
  }
}
</script>