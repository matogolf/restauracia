<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
      <template>
          <v-data-table
            :headers="headers"
            :items="requests"
            hide-actions
            class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ "č." + props.item.id }}</td>         
              <td class="text-xs-center">{{ props.item.detail }}</td>
              <td class="text-xs-center">{{ props.item.Customer.name + " č." + props.item.Customer.id }}</td>
              <td class="text-xs-center">{{ props.item.Customer.Table.name + " č." + props.item.Customer.Table.id }}</td>
              <td>{{ new Date(props.item.createdAt).toString().split(" ").slice(4,5).join(" ")}}</td>
              <td>
                <v-btn dark class="green"
                  @click="assignRequest(props.item.id)">Vybaviť
                  <v-icon right>done</v-icon>
                </v-btn>
            </td>  
            </template>
          </v-data-table>
        </template>
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
h1, h2 {
  font-weight: normal;
  margin: 5vh;
}
</style>

<script>
import RequestService from '@/services/RequestService'

export default {
  data () {
    return {
      requests: [],
      headers: [
        {text: 'Číslo požiadavky', value: 'id'},
        {text: 'Detail', value: 'detail'},
        {text: 'Zákazník', value: 'name'},
        {text: 'Stôl', value: 'name'},
        {text: 'Vytvorené', value: 'createdAt'}
      ]
    }
  },
  methods: {
    async loadRequests () {
      try {
        const response = await RequestService.getRequestList()
        this.requests = response.data
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    async assignRequest (requestId) {
      try {
        const response = await RequestService.assignRequest({
          id: requestId
        })
        this.requests = response.data
        console.log(response.data)
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    }
  },
  beforeMount () {
    this.loadRequests()
  }
}
</script>