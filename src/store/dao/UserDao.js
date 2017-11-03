import {BaseDao} from './BaseDao'

class UserDao extends BaseDao {
  constructor(store) {
    super(store, 'User');
  }

  // the list of users
  setUsers(users) {
    this.store.users = users;
  }
  getUsers() {
    return this.store.users;
  }

  // active user
  setActiveUser(user) {
    this.store.activeUser = user;
  }
  getActiveUser() {
    return this.store.activeUser;
  }
}

export {UserDao};
