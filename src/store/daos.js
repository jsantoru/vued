// the single source of truth
import store from './store'

// import the DAOs
import {UserDao} from './dao/UserDao'
import {SidebarDao} from './dao/SidebarDao'

// export the daos to be set on the root component so all child components have access
// the components will never use the store directly, and will always go through the DAOs
export default {
  userDao: new UserDao(store),
  sidebarDao: new SidebarDao(store)
};
