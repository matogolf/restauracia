<template>


  <v-container fluid>
  <v-btn dark class="cyan" @click="goBack"><v-icon left>reply</v-icon>Vrátiť sa do menu</v-btn>
  <h1>Upravenie zamestnanca</h1>
  <v-layout>
    <v-flex xs8>
        <v-text-field
          label="Meno"
          v-model="newEmployee.name"
          :rules="[required]"
          required
        ></v-text-field>

        <v-text-field
          label="Priezvisko"
          v-model="newEmployee.surname"
          required
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          label="Heslo"
          v-model="newEmployee.password"
          required
          :rules="passwordRules"
        ></v-text-field>

        <v-text-field
          label="Email"
          v-model="newEmployee.email"
          required
          :rules="emailRules"
        ></v-text-field>

        <v-select
          :items="positions"
          item-text="name"
          v-model="newEmployee.employeePositionId"
          label="Pozícia zamestnanca"
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
        @click="editEmployee">
        Uprav
      </v-btn>
      <v-dialog v-model="dialog" max-width="310">
        <v-card>
         <v-card-title class="headline">Zamestnanec upravený</v-card-title>
          <v-card-text>Chcete prejsť späť do menu alebo dodatočne upraviť zamestnanca?</v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="stay()">Upraviť</v-btn>
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
import EmployeeServices from '@/services/EmployeeServices'

export default {
  data () {
    return {
      dialog: false,
      selected: [],
      positions: [],
      newEmployee: {
        id: this.$route.params.employee.id,
        name: this.$route.params.employee.name,
        surname: this.$route.params.employee.surname,
        password: this.$route.params.employee.password,
        email: this.$route.params.employee.email,
        employeePositionId: this.$route.params.employee.employeePositionId
      },
      error: null,
      done: false,
      passwordRules: [
        v => !!v || 'Povinné',
        v => v.length >= 5 || 'Heslo musí mať aspoň 5 znakov'
      ],
      emailRules: [
        v => !!v || 'Povinné',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Zadaj valídny email'
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
    async loadPositions () {
      try {
        const response = await EmployeeServices.getPositions()
        console.log(response.data)
        this.positions = response.data
        var TMPemployees = response.data
        for (var i = 0; i < TMPemployees.length; i++) {
          console.log(TMPemployees[i].employeePositionId)
          TMPemployees[i].employeePositionId = this.positions[TMPemployees[i].employeePositionId - 1].name
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    editEmployee () {
      this.newEmployee.employeePositionId = this.newEmployee.employeePositionId.id
      console.log(this.newEmployee)
      try {
        const response = EmployeeServices.editEmployee(this.newEmployee)
        console.log(response.data)
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
      this.dialog = true
      // this.$router.push({ name: 'employeesManagement' })
    },
    goBack () {
      this.$router.push({ name: 'employeesManagement' })
    },
    stay () {
      this.dialog = false
    },
    checkEmail (email) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return false
      } else {
        return true
      }
    }
  },
  computed: {
    allFilled: function () {
      return this.newEmployee.name === '' || this.newEmployee.surname === '' || this.newEmployee.password === '' || this.newEmployee.email === '' || this.newEmployee.employeePositionId == null || this.newEmployee.password.length < 5 || this.checkEmail(this.newEmployee.email)
    }
  },
  beforeMount () {
    this.loadPositions()
  }
}
</script>