import {BaseDao} from './BaseDao'

class SidebarDao extends BaseDao {
  constructor(store) {
    super(store, 'Sidebar');
  }

  // active sidebar
  setActiveSidebar(value) {
    this.store.activeSidebar = value;
  }
  getActiveSidebar() {
    return this.store.activeSidebar;
  }
}

export {SidebarDao};
