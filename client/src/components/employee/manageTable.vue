<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Zoznam aktuálnych objednávok pre {{ this.table.name + " č." + this.table.id }} </h1>
        <div class="tt">
          <v-container fluid>
            <v-layout column>
                 <div
                  v-for="(customer, i) in this.customers "
                  :key="i">
                      <h2> {{customer.name + " č." + customer.id}}</h2>
                      <v-btn dark class="blue"
                        @click="makeOrder(customer)">Objednať
                        <v-icon right>info_outline</v-icon>
                      </v-btn>
                  <v-data-table
                  :headers="headers"
                  :items="customer.Orders"
                  hide-actions
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.detail }}</td>
                    <td>{{ props.item.sum }}</td>
                    <td>
                      <v-btn dark class="orange"
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

<style scoped>
h1,
h2 {
  margin-top: 2vh;
  font-weight: normal;
  display: inline-block;
}
div.tt {
  width:90%;
}
</style>

<script>
import CustomerServices from '@/services/CustomerServices'

export default {
  data () {
    return {
      dialog: false,
      selected: [],
      table: this.$route.params.table,
      customers: [],
      headers: [
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
        const response = await CustomerServices.customersOfTable({
          tableId: this.table.id
        })
        this.customers = response.data

        console.log(this.customers)
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    itemDetail (item) {
      console.log(item)
      this.$router.push({ name: 'orderDetails', params: { order: item } })
    },
    makeOrder (customer) {
      this.$router.push({ name: 'makeOrder', params: { customer: customer } })
    }
  },
  beforeMount () {
    this.loadTableItems()
  }
}
</script>
