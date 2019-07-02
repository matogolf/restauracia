import axios from 'axios'

const ax = axios.create({baseURL: `http://pis.borntolive.cz:8081/`})

export default {
  getEmployees () {
    return ax.post('/manager/employeeGet')
  },
  getPositions () {
    return ax.post('/manager/positionsGet')
  },
  addEmployee (newEmployee) {
    return ax.post('/manager/employeeAdd', newEmployee)
  },
  editEmployee (Employee) {
    return ax.post('/manager/employeeChange', Employee)
  },
  deleteEmployee (id) {
    return ax.post('/manager/employeeDelete', { id: id })
  }
}
