<template>


  <v-container fluid>
  <v-btn dark class="cyan" @click="goBack"><v-icon left>reply</v-icon>Vrátiť sa do menu</v-btn>
  <h1>Pridanie novej položky do menu</h1>
  <v-layout>
    <v-flex xs8>
        <v-text-field
          label="Meno"
          v-model="newItem.name"
          :rules="[required]"
          required
        ></v-text-field>

        <v-text-field
          label="Cena"
          v-model="newItem.price"
          required
          :rules="number"
        ></v-text-field>

        <v-text-field
          label="Detail"
          v-model="newItem.detail"
          required
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          label="Alergény"
          v-model="newItem.allergens"
        ></v-text-field>

        <v-text-field
          label="Gramáž"
          v-model="newItem.grammage"
          :rules="numberNotReq"
        ></v-text-field>

        <v-text-field
          label="Objem"
          v-model="newItem.volume"
          :rules="numberNotReq"
        ></v-text-field>

        <v-text-field
          label="Alkohol"
          v-model="newItem.alcohol"
        ></v-text-field>

        <v-select
          :items="menus"
          item-text="name"
          v-model="newItem.menuId"
          label="Menu"
          single-line
          :rules="[required]"
          required
        >
        </v-select>

        <v-select
          :items="itemCategories"
          item-text="name"
          v-model="newItem.itemCategoryId"
          label="Id Kategorie"
          single-line
          :rules="[required]"
          required
        >
        </v-select>
      <div class="danger-alert" v-if="error">
        {{ error }}
      </div>
      <p>*povinné údaje</p>
      <v-btn
        dark
        class="cyan"
        v-bind:disabled="allFilled"

        @click="addItem">
        Pridaj do menu
      </v-btn>
      <v-dialog v-model="dialog" max-width="310">
       <v-card>
        <v-card-title class="headline">Položka pridaná</v-card-title>
         <v-card-text>Chcete prejsť späť do menu alebo pridať ďalšiu položku?</v-card-text>
         <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="green darken-1" flat @click="stay()">Pridať ďalšiu</v-btn>
         <v-btn color="green darken-1" flat @click="goBack()">Vrátiť sa do menu</v-btn>
        </v-card-actions>
       </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
  </v-container>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  margin-top: 2vh;
  font-weight: normal;
}
.done {
  color: lawngreen;
}
</style>

<script>
import MenuServices from '@/services/MenuServices'

export default {
  data () {
    return {
      dialog: false,
      selected: [],
      menus: [],
      itemCategories: [],
      newItem: {
        name: null,
        price: null,
        detail: null,
        allergens: null,
        grammage: null,
        volume: null,
        alcohol: null,
        itemCategoryId: null,
        menuId: null
      },
      error: null,
      done: false,
      number: [
        v => !isNaN(v) || 'Zadaj číslo',
        v => !!v || 'Zadaj číslo'
      ],
      numberNotReq: [
        v => !isNaN(v) || 'Zadaj číslo'
      ],
      required: (value) => !!value || 'Povinné'
    }
  },
  // mounted: function () {
  //   this.$nextTick(function () {
  //   // Code that will run only after the
  //   // entire view has been rendered
  //   })
  // },
  methods: {
    async showMenu () {
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
    async showCat () {
      try {
        const response = await MenuServices.getAllActualCat()
        console.log(response.data)
        this.itemCategories = response.data
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    addItem () {
      this.newItem.menuId = this.newItem.menuId.id
      this.newItem.itemCategoryId = this.newItem.itemCategoryId.id
      console.log(this.newItem)
      const response = MenuServices.itemAdd(this.newItem)
      console.log(response.data)
      this.dialog = true
      // this.$router.push({ name: 'editMenu' })
    },
    isFilled () {
      return (this.newItem.name == null || this.newItem.price == null || this.newItem.detail == null || this.newItem.menuId == null)
    },
    goBack () {
      this.$router.push({ name: 'editMenu' })
    },
    stay () {
      this.dialog = false
      this.newItem.name = null
      this.newItem.price = null
      this.newItem.detail = null
      this.newItem.allergens = null
      this.newItem.grammage = null
      this.newItem.volume = null
      this.newItem.alcohol = null
    }
  },
  computed: {
    allFilled: function () {
      return this.newItem.name == null || this.newItem.price == null || this.newItem.detail == null || this.newItem.menuId == null || this.newItem.name === '' || this.newItem.price === '' || this.newItem.detail === '' || this.newItem.menuId === '' || isNaN(this.newItem.price) || isNaN(this.newItem.grammage) || isNaN(this.newItem.volume) || this.newItem.itemCategoryId == null
    }
  },
  beforeMount () {
    this.showMenu()
    this.showCat()
    this.isFilled()
    console.log(this.newItem.name == null)
  }

}
</script>
