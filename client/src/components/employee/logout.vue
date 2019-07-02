<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h2>Pre pokračovanie kliknite na obrázok nižšie. </h2>
        <img @click="exit" class="logo" src="@/assets/logo.png" alt="Vuetify.js">

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  cursor: pointer;
  width: 20vh;
}
h1 {
  font-weight: normal;
  margin: 5vh;
}
</style>

<script>
import store from '@/services/store'
import EventBus from '@/services/events'

export default {
  methods: {
    exit () {
      store.remValue('employee')
      store.remValue('employeeToken')

      EventBus.$emit('empLogout')
      this.$router.push({name: 'welcome'})
    }
  }
}
</script>