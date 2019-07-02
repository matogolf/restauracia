import axios from 'axios'

const ax = axios.create({baseURL: `http://pis.borntolive.cz:8081/`})

export default {
  getAllActualMenu () {
    return ax.post('customer/menu')
  },
  getAllActualCat () {
    return ax.post('employee/itemCategoryList')
  },
  itemAdd (newItem) {
    return ax.post('employee/menuItemAdd', newItem)
  },
  itemEdit (newItem) {
    return ax.post('employee/menuItemChange', newItem)
  },
  itemDelete (itemId) {
    return ax.post('employee/menuItemDelete', { id: itemId })
  },
  menuAdd (newMenu) {
    return ax.post('/employee/menuAdd', newMenu)
  },
  menuEdit (newMenu) {
    return ax.post('/employee/menuChange', newMenu)
  },
  menuDelete (menuId) {
    return ax.post('/employee/menuDelete', { id: menuId })
  }
}
