<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Zoznam aktuálnych objednávok</h1>
        <div class="tt">
          <v-container fluid>
            <v-layout column>
              <div
                v-for="(table, i) in tables"
                :key="i">
                <h2>{{ table.name + " č." + table.id }}</h2>

                <v-data-table
                  :headers="headers"
                  :items="table.customerOrders"
                  hide-actions
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.Customer.name }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.detail }}</td>
                    <td>{{ props.item.sum }}</td>
                    <td>
                      <v-btn dark class="blue"
                      @click="itemDetail(props.item)">Detail
                      <v-icon right>info_outline</v-icon>
                      </v-btn>
                    </td>
                  </template>
                </v-data-table>
              </div>
            </v-layout>
          </v-container>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  margin-top: 2vh;
  font-weight: normal;
}
div.tt {
  width:90%;
}
</style>

<script>
import TableServices from '@/services/TableServices'
import CustomerServices from '@/services/CustomerServices'
import OrderServices from '@/services/OrderServices'

export default {
  data () {
    return {
      dialog: false,
      selected: [],
      tables: [],
      currentOrders: [],
      customers: [],
      headers: [
        { text: 'Meno zákazníka', value: 'customerName' },
        { text: 'Objednávka', value: 'name' },
        { text: 'Detail', value: 'detail' },
        { text: 'K zaplateniu', value: 'sum' },
        { text: 'Detaily' }
      ]
    }
  },
  methods: {
    async loadTableItems () {
      try {
        const response = await TableServices.tablesView()
        this.tables = response.data
        console.log(this.tables)
        const responseCustomers = await CustomerServices.listCustomers(
          new Date()
        )
        this.customers = responseCustomers.data
        var tableCustomers
        for (var i = 0; i < this.tables.length; i++) {
          tableCustomers = this.customers.filter(customer => customer.tableId === this.tables[i].id)
          this.tables[i].customers2 = tableCustomers
        }
        const responseOrders = await OrderServices.currentOrders(
          new Date()
        )
        this.currentOrders = responseOrders.data
        // console.log(this.currentOrders)
        this.currentOrders = this.currentOrders.filter(order => order.paymentId === null)
        for (var l = 0; l < this.currentOrders.length; l++) {
          this.currentOrders[l].customerName = this.currentOrders[l].Customer.name
        }
        // console.log(this.currentOrders)
        // console.log(this.tables)
        var tableOrders

        for (var j = 0; j < this.tables.length; j++) {
          this.tables[j].customerOrders = []
          for (var k = 0; k < this.tables[j].customers2.length; k++) {
            tableOrders = this.currentOrders.filter(order => order.Customer.id === this.tables[j].customers2[k].id)
            this.tables[j].customerOrders = this.tables[j].customerOrders.concat(tableOrders)
          }
        }
        var temp = this.tables
        console.log(this.tables)
        this.tables = []
        this.tables = temp
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    itemDetail (item) {
      console.log(item)
      this.$router.push({ name: 'orderDetails', params: { order: item } })
    }
  },
  beforeMount () {
    this.loadTableItems()
  }
}
</script>