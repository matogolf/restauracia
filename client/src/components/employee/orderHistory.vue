<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Zoznam všetkých objednávok</h1>
        <div class="tt">
        <v-container fluid>
          <v-layout column>
            <div v-if="complete">
                <v-data-table
                    :headers="headers"
                    :items="orders"
                    hide-actions
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.customerName}}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.detail }}</td>
                    <td>{{ props.item.sum }}</td>
                    <td>
                        <v-btn dark class="blue"
                        @click="itemHistory(props.item)">Detail
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
    width:80%;
}
</style>

<script>
import OrderServices from '@/services/OrderServices'
import CustomerServices from '@/services/CustomerServices'

export default {
  data () {
    return {
      complete: false,
      dialog: false,
      selected: [],
      tables: [],
      orders: [],
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
    async loadHistory () {
      const response = await OrderServices.orderHistory()
      this.orders = response.data
      const responseCustomers = await CustomerServices.allCustomers()
      this.customers = responseCustomers.data
      for (var i = 0; i < this.orders.length; i++) {
        var customer = this.customers.find(el => el.id === this.orders[i].customerId)
        this.orders[i].customerName = customer.name
      }
      this.complete = true
    },
    itemHistory (item) {
      console.log(item)
      this.$router.push({ name: 'orderHistoryDetails', params: { order: item } })
    }
  },
  beforeMount () {
    this.loadHistory()
  }
}
</script>