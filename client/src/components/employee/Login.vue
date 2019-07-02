<template>
  <v-container fluid class="login">
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-form @submit="login">
          <v-text-field
            label="e-mail"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="Heslo"
            type="password"
            v-model="password"
          ></v-text-field>
        </v-form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          color="info"
          @click="login">
          Prihlásiť
        </v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<style scoped>
  .login{
    max-width: 500px;
  }
</style>


<script>
import store from '@/services/store'
import LoginServices from '@/services/LoginServices'
import EventBus from '@/services/events'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await LoginServices.login({
          email: this.email,
          password: this.password
        })
        var employee = response.data.employee // email1@email.com
        store.setValue('employeeToken', response.data.token)
        store.setValue('employee', JSON.stringify(employee))

        EventBus.$emit('empLogged', employee)
        this.$router.push({ name: 'employeeMain' })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  mounted () {
    if (store.getValue('employee')) {
      EventBus.$emit('empLogged', JSON.parse(store.getValue('employee')))
      this.$router.push({ name: 'employeeMain' })
    }
  }
}
</script>

<style scoped>
</style>
