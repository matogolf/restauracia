import axios from 'axios'

const ax = axios.create({baseURL: `http://pis.borntolive.cz:8081/`})

export default {
  orderList (customerId) {
    return ax.post('customer/orderList', {customerId: customerId})
  },
  orderAdd (items, customerId) {
    return ax.post('customer/orderAdd', {itemId: items, customerId: customerId, name: 'Objednavka', detail: 'detail', employeeId: '2'})
  },
  orderInfo (orderIdd) {
    return ax.post('customer/orderInfo', {orderId: orderIdd})
  },
  ordersNotPaid (customerId) {
    return ax.post('customer/ordersNotPaid', {customerId: customerId})
  },
  currentOrders (date) {
    return ax.post('/employee/ordersCurrent', {time: date})
  },
  orderHistory () {
    return ax.post('/employee/ordersAll')
  }
}
