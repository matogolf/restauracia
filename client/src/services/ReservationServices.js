import axios from 'axios'

const ax = axios.create({baseURL: `http://pis.borntolive.cz:8081/`})

export default {
  getReservations () {
    return ax.post('/employee/reservationList')
  },
  reservationCreate (newReservation) {
    return ax.post('/employee/reservationCreate', newReservation)
  },
  reservationChange (changedReservation) {
    return ax.post('/employee/reservationChange', changedReservation)
  },
  reservationDelete (id) {
    return ax.post('/employee/reservationDelete', { id: id })
  }
}
