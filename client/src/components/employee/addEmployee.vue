<template>


  <v-container fluid>
  <v-btn dark class="cyan" @click="goBack"><v-icon left>reply</v-icon>Vrátiť sa do menu</v-btn>
  <h1>Pridanie nového zamestnanca</h1>
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
        @click="addEmployee">
        Pridaj do menu
      </v-btn>
        <v-dialog v-model="dialog" max-width="310">
        <v-card>
         <v-card-title class="headline">Zamestnanec vytvorený</v-card-title>
          <v-card-text>Chcete prejsť späť do menu alebo pridať ďalšieho zamestnanca?</v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="stay()">Pridať nového</v-btn>
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
        name: '',
        surname: '',
        password: '',
        email: '',
        employeePositionId: null
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
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    },
    addEmployee () {
      this.newEmployee.employeePositionId = this.newEmployee.employeePositionId.id
      console.log(this.newEmployee)
      try {
        const response = EmployeeServices.addEmployee(this.newEmployee)
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
      this.newEmployee.name = null
      this.newEmployee.surname = null
      this.newEmployee.password = null
      this.newEmployee.email = null
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
