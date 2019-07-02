import axios from 'axios'

const ax = axios.create({baseURL: `http://pis.borntolive.cz:8081/`})

export default {
  createPayment (orderId, employeeId) {
    return ax.post('employee/paymentCreate', {orderId: orderId, employeeId: employeeId})
  }
}
