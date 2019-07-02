<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Správa rezervácií</h1>
        <v-btn color="green accent-3"
          @click="$router.push({name: 'addReservation'})"
          >Pridať rezerváciu
           <v-icon right>add_circle</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
           <v-card-title class="headline">Zrušenie rezervácie</v-card-title>
            <v-card-text>Ste si istý, že chcete zrušiť túto rezerváciu?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="dialog = false">Nie</v-btn>
            <v-btn color="green darken-1" flat @click="deleteReservation(dialogId)">Áno</v-btn>
           </v-card-actions>
         </v-card>
        </v-dialog>
        <v-container fluid>
          <v-layout column>
          <h2>Rezervácie</h2>
          	<v-data-table
                :headers="headers"
                :items="reservations"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.tableId }}</td>
                  <td>{{ props.item.dateStart }}</td>
                  <td>{{ props.item.dateEnd }}</td>
                  <td>{{ props.item.detail }}</td>
                  <td>
                    <v-btn dark class="cyan"
                    @click="updateReservation(props.item)">Upraviť
                    <v-icon right>create</v-icon>
                    </v-btn>
                    <v-btn color="red lighten-1" @click="forceDialog(props.item.id)">Zrušiť<v-icon right>clear</v-icon></v-btn>
                  </td>
                </template>
              </v-data-table>
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
import ReservationServices from '@/services/ReservationServices'

export default {
  data () {
    return {
      dialog: false,
      dialogId: null,
      selected: [],
      employees: [],
      reservations: [],
      headers: [
        { text: 'Meno', value: 'name' },
        { text: 'Stôl', value: 'tableId' },
        { text: 'Začiatok', value: 'dateStart' },
        { text: 'Koniec', value: 'dateEnd' },
        { text: 'Detail', value: 'detail' },
        { text: 'Upraviť / Vymazať' }
      ]
    }
  },
  methods: {
    async loadReservations () {
      try {
        const response = await ReservationServices.getReservations()
        console.log(response.data)
        var myRes = response.data
        for (var i = 0; i < myRes.length; i++) {
          var name = myRes[i].Employee.name.concat(' ').concat(myRes[i].Employee.surname)
          myRes[i].employeeName = name
        }
        this.reservations = myRes
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    forceDialog (id) {
      this.dialogId = id
      this.dialog = true
    },
    updateReservation (reservation) {
      this.$router.push({ name: 'editReservation', params: { reservation: reservation } })
    },
    deleteReservation (id) {
      this.dialog = false
      console.log(id)
      try {
        const response = ReservationServices.reservationDelete(id)
        console.log(response.data)
        for (var i = 0; i < this.reservations.length; i++) {
          if (this.reservations[i].id === id) {
            this.reservations.splice(i, 1)
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
    this.loadReservations()
  }
}
</script>