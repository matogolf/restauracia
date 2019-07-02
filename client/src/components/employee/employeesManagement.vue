<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Správa zamestnancov</h1>
        <v-btn color="green accent-3"
          @click="$router.push({name: 'addEmployee'})"
          >Pridať nového zamestnanca
           <v-icon right>add_circle</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
           <v-card-title class="headline">Prepustenie</v-card-title>
            <v-card-text>Ste si istý, že chcete prepustiť tohto zamestnanca?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="dialog = false">Nie</v-btn>
            <v-btn color="green darken-1" flat @click="deleteEmployee(dialogId)">Áno</v-btn>
           </v-card-actions>
         </v-card>
        </v-dialog>
        <v-container fluid>
          <v-layout column>
          <h2>Zamestnanci</h2>
          	<v-data-table
                :headers="headers"
                :items="employees"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.surname }}</td>
                  <td>{{ props.item.password }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.employeePositionId }}</td>
                  <td>
                    <v-btn dark class="cyan"
                    @click="updateEmployee(props.item)">Upraviť
                    <v-icon right>create</v-icon>
                    </v-btn>
                    <v-btn color="red lighten-1" @click="forceDialog(props.item.id)">Prepustiť<v-icon right>clear</v-icon></v-btn>
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
import EmployeeServices from '@/services/EmployeeServices'

export default {
  data () {
    return {
      dialog: false,
      dialogId: null,
      selected: [],
      employees: [],
      positions: [],
      headers: [
        { text: 'Meno', value: 'name' },
        { text: 'Priezvisko', value: 'surname' },
        { text: 'Heslo', value: 'password' },
        { text: 'Email', value: 'email' },
        { text: 'Pozícia', value: 'employeePositionId' },
        { text: 'Upraviť / Vymazať' }
      ]
    }
  },
  methods: {
    async loadEmployees () {
      try {
        const response = await EmployeeServices.getEmployees()
        const response2 = await EmployeeServices.getPositions()
        console.log(response.data)
        console.log(response2.data)
        var TMPemployees = response.data
        this.positions = response2.data
        for (var i = 0; i < TMPemployees.length; i++) {
          // console.log(TMPemployees[i].employeePositionId)
          TMPemployees[i].employeePositionId = this.positions[TMPemployees[i].employeePositionId - 1].name
        }
        this.employees = TMPemployees
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
      console.log(this.employees)
    },
    forceDialog (id) {
      this.dialogId = id
      this.dialog = true
    },
    updateEmployee (employee) {
      console.log(employee)
      this.$router.push({ name: 'editEmployee', params: { employee: employee } })
    },
    deleteEmployee (id) {
      this.dialog = false
      console.log(id)
      try {
        const response = EmployeeServices.deleteEmployee(id)
        console.log(response.data)
        for (var i = 0; i < this.employees.length; i++) {
          if (this.employees[i].id === id) {
            this.employees.splice(i, 1)
            break
          }
        }
        // this.$router.go()
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    }
  },
  beforeMount () {
    this.loadEmployees()
  }
}
</script>