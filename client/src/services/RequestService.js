import axios from 'axios'

const ax = axios.create({baseURL: `http://pis.borntolive.cz:8081/`})

export default {
  assignRequest (requestId) {
    return ax.post('employee/assignRequest', requestId)
  },
  getRequestList () {
    return ax.post('employee/requestList')
  }
}
