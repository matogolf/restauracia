<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Prosím zavolajte obsluhu</h1>

        <h2>Nezaplatené objednávky:</h2>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.createdAt }}</td>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.orderStateId }}</td>
            <td>{{ props.item.sum }}</td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="green">
              Nemáte žiadne objednávky pre platbu
            </v-alert>
          </template>
        </v-data-table>
        
        <h2>Spolu cena: {{cena}}</h2>

        <div class="h1">Pre pokračovanie privolajte obsluhu.</div>
        <v-btn class="callWait" color="info">Privolať čašníka
            <v-icon right>room_service</v-icon>
        </v-btn>
        <h2>Ďakujeme za návštevu :)</h2>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leave {
  margin: 20px;
  height: 10vh;
}

h1 {
  font-weight: normal;
  margin: 5vh;
}
h2 {
  margin: 5vh;
}
</style>

<script>
import store from '@/services/store'
import CustomerServices from '@/services/CustomerServices'
import OrdersServices from '@/services/OrderServices'

export default {
  data () {
    return {
      headers: [
        {text: 'Čas', value: 'time'},
        { text: 'Číslo', value: 'id' },
        { text: 'Názov', value: 'title' },
        { text: 'Stav', value: 'state' },
        { text: 'Cena', value: 'price' }
      ],
      items: [],
      cena: 0
    }
  },
  methods: {
    async exit () {
      var customer = await store.getCustomer()
      const response = await CustomerServices.customerLeave(customer.id)
      console.log(response.data)
      if (response.data === 'success') {
        store.removeCustomer()
        this.$router.push({name: 'welcome'})
      }
    },
    async load () {
      var customer = await store.getCustomer()
      const response = await OrdersServices.ordersNotPaid(customer.id)
      for (var i = 0; i < response.data.length; i++) {
        var date = new Date(response.data[i].createdAt)
        this.cena += response.data[i].sum
        response.data[i].createdAt = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
      console.log(response)
      this.items = response.data
    }
  },
  beforeMount () {
    this.load()
  }
}
</script>