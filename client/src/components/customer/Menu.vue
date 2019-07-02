<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Naše aktuálne menu:</h1>
        
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
                </template>
              </v-data-table>
            </div>
          </v-layout>
        </v-container>
        
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
import MenuServices from '@/services/MenuServices'

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
        { text: 'Cena', value: 'price' }
      ]
    }
  },
  methods: {
    async loadMenuItems () {
      try {
        const response = await MenuServices.getAllActualMenu()
        console.log(response.data)
        this.menus = response.data
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    }
  },
  beforeMount () {
    this.loadMenuItems()
  }
}
</script>