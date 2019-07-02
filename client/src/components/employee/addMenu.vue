<template>
  <v-container fluid>
  <v-btn dark class="cyan" @click="goBack"><v-icon left>reply</v-icon>Vrátiť sa do menu</v-btn>
  <h1>Pridanie nového menu</h1>
  <v-layout>
    <v-flex xs8>
        <v-text-field
          label="Meno"
          v-model="newMenu.name"
          :rules="[required]"
          required
        ></v-text-field>

        <v-text-field
          label="Detail"
          v-model="newMenu.detail"
          :rules="[required]"
          required
        ></v-text-field>

        <v-checkbox
          label="Validita menu"
          v-model="newMenu.validity"
        ></v-checkbox>

      <div class="danger-alert" v-if="error">
        {{ error }}
      </div>
      <p>*povinné údaje</p>
      <v-btn
        dark
        class="cyan"
        v-bind:disabled="allFilled"

        @click="addNewMenu">
        Pridaj do menu
      </v-btn>
      <v-dialog v-model="dialog" max-width="310">
       <v-card>
        <v-card-title class="headline">Menu pridané</v-card-title>
         <v-card-text>Chcete prejsť späť do menu alebo pridať ďalšie menu?</v-card-text>
         <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="green darken-1" flat @click="stay()">Pridať ďalšie</v-btn>
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
      newMenu: {
        name: null,
        detail: null,
        validity: false
      },
      error: null,
      required: (value) => !!value || 'Povinné'
    }
  },
  methods: {
    addNewMenu () {
      console.log(this.newMenu)
      const response = MenuServices.menuAdd(this.newMenu)
      console.log(response.data)
      this.dialog = true
      // this.$router.push({ name: 'editMenu' })
    },
    goBack () {
      this.$router.push({ name: 'editMenu' })
    },
    stay () {
      this.dialog = false
      this.newMenu.name = null
      this.newMenu.detail = null
      this.newMenu.validity = null
    }
  },
  computed: {
    allFilled: function () {
      return this.newMenu.name == null || this.newMenu.detail == null || this.newMenu.name === '' || this.newMenu.detail === ''
    }
  },
  beforeMount () {
  }

}
</script>
