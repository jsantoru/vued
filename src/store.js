var store = {
  // TODO: how best to structure this? DAOs? data and methods? other?
  activeSidebar: '',
  users: [],
  setActiveSidebar: function (sidebar) {
    console.log(sidebar);
    this.activeSidebar = sidebar;
  },
  setUsers: function (users) {
    this.users = users;
  },
  addUser: function(user) {
    this.users.push(user);
  }
};

module.exports = store;
