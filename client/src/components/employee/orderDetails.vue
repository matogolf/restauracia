<template>
  <v-container fluid>
      <v-btn dark class="cyan" @click="goBack"><v-icon left>reply</v-icon>Vrátiť sa do menu</v-btn>
      <br>
      <v-btn dark class="green" @click="finalizePayment"><v-icon left>euro_symbol</v-icon>Zrealizovať platbu</v-btn>
      <div class="tt">
        <v-layout column align-left xs3>
            <h1>Detail Objednávky</h1>
            <table>
                <tr>
                    <td class="first">Meno zákazníka</td>
                    <td>{{ order.name }}</td>
                </tr>  
                <tr>
                    <td class="first">Objednávka</td>
                    <td>{{ order.order }}</td>
                </tr> 
                <tr>
                    <td class="first">Detail objednávky</td>
                    <td>{{ order.detail }}</td>
                </tr> 
                <tr>
                    <td class="first">Suma k zaplateniu</td>
                    <td>{{ order.sum }}</td>
                </tr> 
            </table>
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
        </v-layout>
    </div>
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
      order: {
        id: this.$route.params.order.id,
        name: this.$route.params.order.Customer.name,
        order: this.$route.params.order.name,
        detail: this.$route.params.order.detail,
        sum: this.$route.params.order.sum,
        employeeId: this.$route.params.order.employeeId
      },
      headers: [
        {text: 'Názov', value: 'name'},
        { text: 'Detail', value: 'detail' },
        { text: 'Alergény', value: 'allergens' },
        { text: 'Hmotnosť', value: 'grammage' },
        { text: 'Objem', value: 'volume' },
        { text: 'Percento alkoholu', value: 'alcohol' },
        { text: 'Cena', value: 'price' }
      ],
      orderItems: [],
      error: null,
      done: false
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'manageOrders' })
    },
    async finalizePayment () {
      try {
        const response = await PaymentServices.createPayment(this.order.id, this.order.employeeId)
        this.tables = response.data
        this.$router.push({ name: 'manageOrders' })
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    async loadOrderItems () {
      console.log('ide toooo')
      console.log(this.order.id)
      const response = await OrderServices.orderInfo(this.order.id)
      console.log(response.data)
      this.orderItems = response.data.Items
    }
  },
  beforeMount () {
    this.loadOrderItems()
  }

}
</script>
