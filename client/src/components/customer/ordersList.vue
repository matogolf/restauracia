<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Vitajte pri vašom stole</h1>
        <div>Zákazník ID: {{customerID}}</div>
        <h2>Vaše objednávky:</h2>
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
            <td>{{ props.item.OrderState.name }}</td>
            <td>{{ props.item.sum }}</td>
            <v-btn dark class="blue" @click=openDetail(props.item)>Detail</v-btn>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="green">
              Nemáte žiadne objednávky
            </v-alert>
          </template>
        </v-data-table>
        
        <v-btn 
          color="success" 
          @click="$router.push({name: 'newOrder'})"
          >Nová objednávka
          <v-icon right>add_circle</v-icon>
        </v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  margin: 2vh;
}
</style>

<script>
import store from '@/services/store'
import OrderServices from '@/services/OrderServices'
import EventBus from '@/services/events'

export default {
  data () {
    return {
      headers: [
        {text: 'Čas', value: 'time'},
        { text: 'Číslo', value: 'id' },
        { text: 'Názov', value: 'title' },
        { text: 'Stav', value: 'state' },
        { text: 'Cena', value: 'price' },
        { text: 'Detail', value: 'aa' }
      ],

      items: [],

      customerID: store.getCustomer().id
    }
  },
  methods: {
    async loadOrders () {
      try {
        const response = await OrderServices.orderList(this.customerID)
        for (var i = 0; i < response.data.length; i++) {
          var date = new Date(response.data[i].createdAt)
          response.data[i].createdAt = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        }
        console.log(response.data)
        this.items = response.data
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    async openDetail (item) {
      console.log(item)
      this.$router.push({name: 'orderDetail', params: {order: item}})
    }
  },
  mounted () {
    this.loadOrders()
    EventBus.$on('newOrder', this.loadOrders)
  }
}
</script>