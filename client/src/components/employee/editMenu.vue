<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Upraviť aktuálne menu :</h1>
        <v-btn color="green accent-3"
          @click="$router.push({name: 'addMenu'})"
          >Pridať nové menu
           <v-icon right>add_circle</v-icon>
        </v-btn>
         <v-btn color="green accent-3"
          @click="$router.push({name: 'addItem'})"
          >Pridať novú položku do menu
           <v-icon right>add_circle</v-icon>
        </v-btn>
        <v-dialog v-model="dialogMenu" max-width="290">
          <v-card>
           <v-card-title class="headline">Vymazať</v-card-title>
            <v-card-text>Ste si istý, že chcete odstrániť menu?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="dialogMenu = false">Nie</v-btn>
            <v-btn color="green darken-1" flat @click="deleteMenu(dialogIdMenu)">Áno</v-btn>
           </v-card-actions>
         </v-card>
        </v-dialog>
        <v-dialog v-model="dialogItem" max-width="290">
          <v-card>
           <v-card-title class="headline">Vymazať</v-card-title>
            <v-card-text>Ste si istý, že chcete odstrániť položku z menu?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="dialogItem = false">Nie</v-btn>
            <v-btn color="green darken-1" flat @click="deleteItem(dialogIdItem)">Áno</v-btn>
           </v-card-actions>
         </v-card>
        </v-dialog>
        <v-container fluid>
          <v-layout column>
            <div
              v-for="(menu, i) in menus"
              :key="i">

              <h2>{{ menu.name }}</h2>
              <div>{{ menu.detail }}
                <v-btn dark class="cyan" @click="updateMenu(menu)">Upraviť menu<v-icon right>create</v-icon></v-btn>
                <v-btn color="red lighten-1" @click="forceDialogMenu(menu)">Vymazať menu<v-icon right>delete_forever</v-icon></v-btn>
              </div>

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
                    <v-btn dark class="cyan"
                    @click="updateItem(props.item)">Upraviť
                    <v-icon right>create</v-icon>
                    </v-btn>
                    <v-btn color="red lighten-1" @click="forceDialogItem(props.item.id)">Vymazať<v-icon right>delete_forever</v-icon></v-btn>
                  </td>
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
      dialogMenu: false,
      dialogItem: false,
      dialogIdMenu: null,
      dialogIdItem: null,
      selected: [],
      menus: [],
      headers: [
        {text: 'Názov', value: 'name'},
        { text: 'Detail', value: 'detail' },
        { text: 'Alergény', value: 'allergens' },
        { text: 'Hmotnosť', value: 'grammage' },
        { text: 'Cena', value: 'price' },
        { text: 'Upraviť / Vymazať' }
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
    },
    updateItem (item) {
      console.log(item)
      this.$router.push({ name: 'editItem', params: { item: item } })
    },
    deleteItem (id) {
      console.log(id)
      this.dialogItem = false
      try {
        const response = MenuServices.itemDelete(id)
        console.log(response.data)
        for (var i = 0; i < this.menus.length; i++) {
          for (var j = 0; j < this.menus[i].Items.length; j++) {
            if (this.menus[i].Items[j].id === id) {
              this.menus[i].Items.splice(j, 1)
              break
            }
          }
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    forceDialogItem (id) {
      this.dialogIdItem = id
      this.dialogItem = true
    },
    forceDialogMenu (menu) {
      this.dialogIdMenu = menu
      this.dialogMenu = true
    },
    updateMenu (menu) {
      console.log(menu)
      this.$router.push({ name: 'editCurrentMenu', params: { menu: menu } })
    },
    deleteMenu (menu) {
      console.log(menu.id)
      this.dialogMenu = false
      try {
        const response = MenuServices.menuDelete(menu.id)
        console.log(response.data)
        for (var i = 0; i < this.menus.length; i++) {
          if (this.menus[i].id === menu.id) {
            this.menus.splice(i, 1)
            break
          }
        }
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