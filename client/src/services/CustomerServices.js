import axios from 'axios'

const ax = axios.create({baseURL: `http://pis.borntolive.cz:8081/`})

export default {
  listCustomers (date) {
    return ax.post('employee/listCustomers', {time: date})
  },
  allCustomers () {
    return ax.post('employee/listAllCustomers')
  },
  newCustomer (table) {
    return ax.post('customer/Create', table)
  },
  customerLeave (customerId) {
    return ax.post('customer/leave', {customerId: customerId})
  },
  customersOfTable (table) {
    return ax.post('employee/customersOfTable', table)
  }
}
