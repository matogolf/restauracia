import axios from 'axios'

const ax = axios.create({baseURL: `http://pis.borntolive.cz:8081/`})

export default {
  tablesView (time) {
    return ax.post('customer/tableView', time)
  },
  callWaiter (customer, detail) {
    return ax.post('customer/callEmployee', {customerId: customer, detail: detail})
  },
  tableCustomer (customer) {
    return ax.post('employee/tableCustomer', customer)
  }
}
