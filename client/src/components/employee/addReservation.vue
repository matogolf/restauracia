<template>


  <v-container fluid>
  <v-btn dark class="cyan" @click="goBack"><v-icon left>reply</v-icon>Vrátiť sa do menu</v-btn>
  <h1>Pridanie novej rezervácie</h1>
  <v-layout>
    <v-flex xs8>
        <v-text-field
          label="Meno rezervácie"
          v-model="newReservation.name"
          :rules="[required]"
          required
        ></v-text-field>

        <v-text-field
          label="Kontakt na zákazníka"
          v-model="newReservation.contact"
          required
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          label="Detail rezervácie"
          v-model="newReservation.detail"
        ></v-text-field>

        <v-select
          :items="tables"
          item-text="id"
          v-model="newReservation.tableId"
          label="Stôl"
          single-line
          :rules="[required]"
          required
        >
        </v-select>
        <v-btn color="primary" dark @click.native.stop="dialogDate = true">Vyberte Datum</v-btn>
        <v-dialog v-model="dialogDate" max-width="310">
          <v-card>
            <v-card-title class="headline">Vybrať dátum</v-card-title>
            <v-card-actions>
              <v-layout>
              <v-flex xs10 sm5>
                <v-date-picker v-model="startDate"></v-date-picker>
              </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn color="primary" dark @click.native.stop="dialogTime1 = true">Vyberte čas príchodu</v-btn>
        <v-btn color="primary" dark @click.native.stop="dialogTime2 = true">Vyberte čas odchodu</v-btn>
        <v-dialog v-model="dialogTime1" max-width="290">
          <v-card>
            <v-card-title class="headline">Vybrat čas príchodu</v-card-title>
            <v-card-actions>
              <v-layout>
              <v-flex xs10 sm5>
                 <v-time-picker width="272" v-model="startTime"></v-time-picker>
            </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogTime2" max-width="290">
          <v-card>
            <v-card-title class="headline">Vybrat čas odchodu</v-card-title>
            <v-card-actions>
              <v-layout>
              <v-flex xs10 sm5>
                 <v-time-picker width="272" v-model="endTime"></v-time-picker>
              </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <p>*povinné údaje</p>
        <v-btn
        dark
        class="cyan"
        v-bind:disabled="allFilled"
        @click="addReservation">
        Pridaj rezerváciu
      </v-btn>
      <v-dialog v-model="dialog" max-width="360">
        <v-card>
         <v-card-title class="headline">Rezervácia vytvorená</v-card-title>
          <v-card-text>Chcete prejsť späť do menu rezervácií alebo vytvoriť ďalšiu rezerváciu?</v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="stay()">Vytvoriť novú</v-btn>
          <v-btn color="green darken-1" flat @click="goBack()">Vrátiť sa do rezervácií</v-btn>
         </v-card-actions>
       </v-card>
      </v-dialog>
      <div class="danger-alert" v-if="error">
        {{ error }}
      </div>
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
import ReservationServices from '@/services/ReservationServices'
import TableServices from '@/services/TableServices'

export default {
  data () {
    return {
      dialog: false,
      selected: [],
      positions: [],
      dialogDate: false,
      dialogTime1: false,
      dialogTime2: false,
      tables: [],
      startDate: null,
      startTime: null,
      reservations: [],
      endDate: null,
      endTime: null,
      newReservation: {
        name: null,
        detail: null,
        contact: null,
        dateStart: null,
        dateEnd: null,
        tableId: null,
        employeeId: null
      },
      error: null,
      done: false,
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
    async loadTables () {
      try {
        const response = await TableServices.tablesView()
        // console.log(response.data)
        this.tables = response.data
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    async loadReservations () {
      try {
        const response = await ReservationServices.getReservations()
        console.log(response.data)
        var resList = response.data
        var resStart, resEnd
        for (var i = 0; i < resList.length; i++) {
          resStart = new Date(resList[i].dateStart)
          resEnd = new Date(resList[i].dateEnd)
          var reservation = {}
          reservation.dateStart = resStart.getTime()
          reservation.dateEnd = resEnd.getTime()
          reservation.tableId = resList[i].tableId
          this.reservations.push(reservation)
        }
        console.log(this.reservations)
        // this.tables = response.data
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    goBack () {
      this.$router.push({ name: 'reservationManagment' })
    },
    stay () {
      this.newReservation.name = ''
      this.newReservation.detail = ''
      this.newReservation.contact = ''
      this.newReservation.dateStart = ''
      this.newReservation.dateEnd = null
      this.newReservation.tableId = null
      this.dialog = false
    },
    async addReservation () {
      try {
        this.error = null
        var constructedStart = this.startDate.concat('T').concat(this.startTime).concat(':00')
        var constructedEnd = this.startDate.concat('T').concat(this.endTime).concat(':00')
        var start = new Date(constructedStart)
        var end = new Date(constructedEnd)
        var workStart = start.getTime()
        var workEnd = end.getTime()
        if (workEnd <= workStart) {
          this.error = 'Rezervácia sa musí skôr začať ako skončiť'
        }
        if (workEnd - workStart < 7200 * 1000) {
          this.error = 'Rezervácia musí trvať minimálne 2 hodiny'
        }
        var current = new Date()
        if (workStart < current.getTime()) {
          this.error = 'Rezervácia musí byť v budúcnosti'
        }
        this.newReservation.tableId = this.newReservation.tableId.id
        for (var i = 0; i < this.reservations.length; i++) {
          if (this.reservations[i].tableId === this.newReservation.tableId) {
            if (this.reservations[i].dateStart >= workStart && this.reservations[i].dateStart < workEnd) {
              this.error = 'Konflikt rezervácií'
            } else if (this.reservations[i].dateEnd >= workStart && this.reservations[i].dateEnd < workEnd) {
              this.error = 'Konflikt rezervácií'
            }
          }
        }
        if (this.error === null) {
          this.newReservation.employeeId = 2
          this.newReservation.dateStart = start
          this.newReservation.dateEnd = end
          console.log(this.newReservation)
          const response = await ReservationServices.reservationCreate(this.newReservation)
          console.log(response)
          this.dialog = true
          // this.$router.push({ name: 'reservationManagment' })
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    }
  },
  computed: {
    allFilled: function () {
      return this.newReservation.name == null || this.newReservation.contact == null ||
      this.startDate == null || this.startTime == null || this.endTime == null || this.newReservation.tableId == null ||
      this.newReservation.name === '' || this.newReservation.contact === ''
    }
  },
  beforeMount () {
    this.loadTables()
    this.loadReservations()
  }
}
</script>
