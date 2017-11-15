<template>
  <div id="main-content">
    <h1>{{ msg }} | <span v-if="sidebarDao.getActiveSidebar()">{{ sidebarDao.getActiveSidebar().name }}</span> <span v-if="userDao.getActiveUser()">| {{userDao.getActiveUser().name}}</span></h1>
    <ul class="list-group">
      <li
        v-for="user in userDao.getUsers()"
        class="list-group-item list-group-item-action"
        @click="setActive(user)"
        :class="{'active': isActive(user), 'bold': isActive(user)}"
      >{{getUserDisplayName(user)}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  data () {
      return {
        msg: 'This is the main content',

        // inject the daos
        sidebarDao: this.$root.$data.daos.sidebarDao,
        userDao: this.$root.$data.daos.userDao
      }
  },
  computed: {
    activeUser() {
      return this.userDao.getActiveUser()
    }
  },
  methods: {
      getUserDisplayName: function(user) {
          return user.name + " (" + user.email + ")";
      },
      setActive: function(user) {
          //this.activeUser = user;
          this.userDao.setActiveUser(user);
      },
      isActive: function(user) {
          if(this.activeUser && user) {
            return user.email === this.activeUser.email;
          }
          return false;
      },
      retrieveUsers: function() {
        this.$http.get("https://jsonplaceholder.typicode.com/users")
          .then(function(response) {
            this.userDao.setUsers(response.data);
          });
      }
  },
  // when this component is created
  created: function() {
    this.retrieveUsers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main-content {
    overflow-y: auto;
    padding: 2em;
    width:80%;
    flex: 0 0 auto;
    border: thin solid black;
  }

  .bold {
    font-weight:bold;
  }
</style>
