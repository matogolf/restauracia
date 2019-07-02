<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Vyberte si z nášho menu:</h1>
        
        <v-container fluid>
          <v-layout column>
            <div
              v-for="(menu, i) in menus"
              :key="i">

              <h2>{{ menu.name }}</h2>
              <div>{{ menu.detail }}</div>
              <v-data-table
                :headers="headers"
                :items="menu.Items"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.detail }}</td>
                  <td>{{ props.item.allergens }}</td>
                  <td>{{ props.item.grammage }}</td>
                  <td>{{ props.item.price }}</td>
                  <td>
                    <v-checkbox 
                      :input-value="selected.indexOf(props.item.id) !== -1" 
                      @click="toggleSelected(props.item.id, props.item.price)">
                    </v-checkbox>
                  </td>
                </template>
              </v-data-table>
            </div>
          </v-layout>
        </v-container>
        
        <h2>Cena: {{ totalSum }}</h2>

        <v-btn 
          color="success" 
          @click="sendOrder(selected)"
          >Odoslať
        </v-btn>
        
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  margin-top: 2vh;
  font-weight: normal;
}
</style>

<script>
import store from '@/services/store'
import MenuServices from '@/services/MenuServices'
import OrderServices from '@/services/OrderServices'
import EventBus from '@/services/events'

export default {
  data () {
    return {
      selected: [],
      menus: [],
      headers: [
        {text: 'Názov', value: 'name'},
        { text: 'Detail', value: 'detail' },
        { text: 'Alergény', value: 'allergens' },
        { text: 'Hmotnosť', value: 'grammage' },
        { text: 'Cena', value: 'price' },
        { text: 'Vybrať', value: 'check' }
      ],
      totalSum: 0,
      customerID: store.getCustomer().id
    }
  },
  methods: {
    toggleSelected (id, price) {
      if (this.selected.indexOf(id) === -1) {
        this.selected.push(id)
        this.totalSum += price
      } else {
        this.selected.splice(this.selected.indexOf(id), 1)
        this.totalSum -= price
      }
    },
    async loadMenuItems () {
      try {
        const response = await MenuServices.getAllActualMenu()
        this.menus = response.data
        console.log(this.menus)
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    async sendOrder (selected) {
      if (selected.length !== 0) {
        const response = await OrderServices.orderAdd(selected, this.customerID)
        console.log(response.data)
        EventBus.$emit('newOrder')
        this.$router.push({name: 'main'})
      }
    }
  },
  beforeMount () {
    this.loadMenuItems()
  }
}
</script>