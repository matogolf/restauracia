import axios from 'axios'

const ax = axios.create({baseURL: `http://pis.borntolive.cz:8081/`})

export default {
  login (credentials) {
    return ax.post('employee/login', credentials)
  }
}
