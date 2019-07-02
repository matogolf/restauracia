import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/customer/welcome'
import Orders from '@/components/customer/ordersList'
import OrderDetail from '@/components/customer/orderDetail'
import NewOrder from '@/components/customer/orderNew'
import Menu from '@/components/customer/menu'
import Payment from '@/components/customer/payment'
import Exit from '@/components/customer/exit'

import EmployeeLogin from '@/components/employee/login'
import EmployeeLogout from '@/components/employee/logout'
import EmployeeMain from '@/components/employee/Main'
import EditMenu from '@/components/employee/editMenu'
import AddItem from '@/components/employee/addItem'
import EditItem from '@/components/employee/editItem'
import AddMenu from '@/components/employee/addMenu'
import EditCurrentMenu from '@/components/employee/editCurrentMenu'
import AddEmployee from '@/components/employee/addEmployee'
import EditEmployee from '@/components/employee/editEmployee'
import EmployeesManagement from '@/components/employee/employeesManagement'
import ManageOrders from '@/components/employee/manageOrders'
import OrderDetails from '@/components/employee/orderDetails'
import OrderHistory from '@/components/employee/orderHistory'
import OrderHistoryDetails from '@/components/employee/orderHistoryDetails'
import ReservationManagment from '@/components/employee/reservationManagment'
import AddReservation from '@/components/employee/addReservation'
import EditReservation from '@/components/employee/editReservation'
import ManageTable from '@/components/employee/manageTable'
import CustomerRequest from '@/components/employee/customersRequest'
import MakeOrder from '@/components/employee/makeOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/orders',
      name: 'main',
      component: Orders
    },
    {
      path: '/newOrder',
      name: 'newOrder',
      component: NewOrder
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/exit',
      name: 'logout',
      component: Exit
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/orderDetail/:order',
      name: 'orderDetail',
      component: OrderDetail
    },
    {
      path: '/employee/login',
      name: 'employeeLogin',
      component: EmployeeLogin
    },
    {
      path: '/employee/logout',
      name: 'employeeLogout',
      component: EmployeeLogout
    },
    {
      path: '/employee/Main',
      name: 'employeeMain',
      component: EmployeeMain
    },
    {
      path: '/employee/editMenu',
      name: 'editMenu',
      component: EditMenu
    },
    {
      path: '/employee/addItem',
      name: 'addItem',
      component: AddItem
    },
    {
      path: '/employee/employeesManagement',
      name: 'employeesManagement',
      component: EmployeesManagement
    },
    {
      path: '/employee/editItem/:item',
      name: 'editItem',
      component: EditItem
    },
    {
      path: '/employee/editCurrentMenu/:menu',
      name: 'editCurrentMenu',
      component: EditCurrentMenu
    },
    {
      path: '/employee/addMenu',
      name: 'addMenu',
      component: AddMenu
    },
    {
      path: '/employee/addEmployee',
      name: 'addEmployee',
      component: AddEmployee
    },
    {
      path: '/employee/editEmployee/:employee',
      name: 'editEmployee',
      component: EditEmployee
    },
    {
      path: '/employee/manageOrders',
      name: 'manageOrders',
      component: ManageOrders
    },
    {
      path: '/employee/orderDetails/:order',
      name: 'orderDetails',
      component: OrderDetails
    },
    {
      path: '/employee/orderHistory',
      name: 'orderHistory',
      component: OrderHistory
    },
    {
      path: '/employee/historyOrderDetails/:order',
      name: 'orderHistoryDetails',
      component: OrderHistoryDetails
    },
    {
      path: '/employee/reservationManagment',
      name: 'reservationManagment',
      component: ReservationManagment
    },
    {
      path: '/employee/addReservation',
      name: 'addReservation',
      component: AddReservation
    },
    {
      path: '/employee/editReservation/:reservation',
      name: 'editReservation',
      component: EditReservation
    },
    {
      path: '/employee/manageTable/:table',
      name: 'manageTable',
      component: ManageTable
    },
    {
      path: '/employee/customersRequest',
      name: 'customersRequest',
      component: CustomerRequest
    },
    {
      path: '/employee/makeOrder/:customer',
      name: 'makeOrder',
      component: MakeOrder
    }
  ]
})
