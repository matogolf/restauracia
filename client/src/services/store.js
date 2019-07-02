import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

export default {
  newCustomer (customer) {
    Vue.localStorage.set('Customer', JSON.stringify(customer))
  },
  getCustomer () {
    var customer = Vue.localStorage.get('Customer', null, 'Chyba v systeme')
    return JSON.parse(customer)
  },
  removeCustomer () {
    Vue.localStorage.set('Customer', null)
  },
  setValue (name, value) {
    Vue.localStorage.set(name, value)
  },
  getValue (name) {
    return Vue.localStorage.get(name, null)
  },
  remValue (name) {
    return Vue.localStorage.remove(name)
  }
}
