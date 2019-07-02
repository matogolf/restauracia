<template>
  <v-container fluid>
      <v-layout column align-center>
        <h1>Detail Objednávky</h1>
        <table>
            <tr>
                <td class="first">Názov</td>
                <td>{{ order.name }}</td>
            </tr>  
            <tr>
                <td class="first">Stav</td>
                <td>{{ order.OrderState.name }}</td>
            </tr> 
            <tr>
                <td class="first">Detail objednávky</td>
                <td>{{ order.detail }}</td>
            </tr> 
            <tr>
                <td class="first">Cena</td>
                <td>{{ order.sum }}</td>
            </tr> 
        </table>
      </v-layout>
      <v-layout column align-center>
      <v-data-table
          :headers="headers"
          :items="orderItems"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.detail }}</td>
            <td>{{ props.item.allergens }}</td>
            <td>{{ props.item.grammage }}</td>
            <td>{{ props.item.volume }}</td>
            <td>{{ props.item.alcohol }}</td>
            <td>{{ props.item.price }}</td>
          </template>
        </v-data-table>
      <v-btn dark class="cyan" @click="goBack">
        <v-icon left>reply</v-icon> Vrátiť sa do menu
      </v-btn>
    </v-layout>
  </v-container>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  margin-top: 2vh;
  font-weight: normal;
}
td {
    font-size: 18px;
}
div.tt {
    width:80%;
}
.done {
  color: lawngreen;
}
table {
    margin-bottom: 20px;
}
td.first {
    width: 300px;
}
</style>

<script>
import OrderServices from '@/services/OrderServices'
import PaymentServices from '@/services/PaymentServices'

export default {
  data () {
    return {
      order: [],
      headers: [
        {text: 'Názov', value: 'name'},
        { text: 'Detail', value: 'detail' },
        { text: 'Alergény', value: 'allergens' },
        { text: 'Hmotnosť', value: 'grammage' },
        { text: 'Objem', value: 'volume' },
        { text: 'Alkohol', value: 'alcohol' },
        { text: 'Cena', value: 'price' }
      ],
      orderItems: [],
      error: null,
      done: false
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'main' })
    },
    finalizePayment () {
      try {
        PaymentServices.createPayment(this.order.id, this.order.employeeId)
        this.$router.push({ name: 'main' })
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    async loadOrderItems () {
      const response = await OrderServices.orderInfo(this.order.id)
      this.orderItems = response.data.Items
    }
  },
  beforeMount () {
    this.order = this.$route.params.order
    console.log(this.order)
    this.loadOrderItems()
  }

}
</script>
