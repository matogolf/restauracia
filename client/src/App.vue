<template>
  <v-app>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click="drawerClick (item.path)"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn class="callWait" :disabled="callW" @click="callWait" color="info">Privolať čašníka
        <v-icon right>room_service</v-icon>
      </v-btn>
      <div style="cursor: pointer;" v-if="callW"
        v-on:click="$router.push({name: 'customersRequest'})">
        <v-badge color="red" overlap>
          <span slot="badge">{{ requestCount }}</span>
          <v-icon large color="grey">account_box</v-icon>
        </v-badge>
      </div>
      <v-spacer></v-spacer>
      <img class="logo" src="@/assets/logo.png">
    </v-toolbar>
    
    <v-content>
      <router-view/>
    </v-content>

    <v-footer app>
      <v-layout>
        <span>
          &copy; 2018 PIS team &nbsp; &nbsp;
          {{userID}} &nbsp; &nbsp;
          <v-btn
            @click="$router.push({name: 'employeeLogin'})"
            >Zamestnanec
            <v-icon right>perm_identity</v-icon>
          </v-btn>
        </span>
      </v-layout>
    </v-footer>
  </v-app>
</template>


<style>
  .logo{
    height: 5vh;
  }
</style>

<script>
import store from '@/services/store'
import EventBus from '@/services/events'
import TableServices from '@/services/TableServices'
import RequestService from '@/services/RequestService'
export default {
  data () {
    return {
      drawer: false,
      items: [],
      itemsCustomer: [{ icon: 'crop_din', title: 'Stôl', path: 'main' },
          {icon: 'shopping_basket', title: 'Objednávka', path: 'newOrder'},
          { icon: 'restaurant_menu', title: 'Menu', path: 'menu' },
          { icon: 'payment', title: 'Platba', path: 'payment' },
          { icon: 'exit_to_app', title: 'Odísť', path: 'logout' }],
      itemsEmployee: [{icon: 'bubble_chart', title: 'Úvod', path: 'employeeMain'},
          { icon: 'account_box', title: 'Obsluha', path: 'customersRequest' },
          { icon: 'bookmark', title: 'Správa rezervácií', path: 'reservationManagment' },
          { icon: 'attach_money', title: 'Správa objednávok', path: 'manageOrders' },
          { icon: 'restaurant_menu', title: 'Upravenie Menu', path: 'editMenu' },
          { icon: 'history', title: 'História objednávok', path: 'orderHistory' },
          { icon: 'exit_to_app', title: 'Odísť', path: 'employeeLogout' }],
      title: 'Reštaurácia pri FITe',
      callW: false,
      requestCount: 0,
      userID: ' ',
      customer: []
    }
  },
  methods: {
    empLogged (employee) {
      this.items = this.itemsEmployee
      if (employee.employeePositionId === 1) {
        this.items.push({ icon: 'supervisor_account', title: 'Správa zamestnancov', path: 'employeesManagement' })
        this.userID = 'Manažér: ' + employee.name
      } else {
        this.userID = 'Zamestnanec: ' + employee.name
      }
      this.loadRequests()
      this.callW = true
      /* this.interval = setInterval(function () {
        this.loadRequests()
      }.bind(this), 5000) */
    },
    drawerClick (path) {
      this.$router.push({name: path})
    },
    callWait () {
      TableServices.callWaiter(this.customer.id, 'Pomoc')
    },
    async loadRequests () {
      try {
        const response = await RequestService.getRequestList()
        console.log(response.data.length)
        this.requestCount = response.data.length
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
      }
    }
  },
  beforeMount () {
    var emp = store.getValue('employee')
    this.customer = store.getCustomer()
    if (store.getValue('employee')) {
      this.empLogged(emp)
    } else if (this.customer) {
      this.items = this.itemsCustomer
      this.userID = 'Zákazník ID:' + this.customer.id
    } else {
      this.items = []
    }
    EventBus.$on('empLogged', this.empLogged)
    EventBus.$on('empLogout', function () { this.items = this.itemsCustomer })
  }
}
</script>
