<template>
  <div id="left-sidebar">
    <h3>Sidebar header</h3>
    <ul class="nav nav-pills flex-column">
      <li v-for="menuItem in menuItems" nav-item>
        <a class="nav-link" href="#" @click="setActive(menuItem)" :class="{'bold': isActive(menuItem)}">{{menuItem.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'LeftSidebar',
    data () {
      return {
        msg: 'This is the left sidebar',
        menuItems: [
          {id: 1, name: "One"},
          {id: 2, name: "Two"},
          {id: 3, name: "Three"},
          {id: 4, name: "Four"}
        ],

        // inject the daos
        sidebarDao: this.$root.$data.daos.sidebarDao
      }
    },
    computed: {
      selectedItem() {
          return this.sidebarDao.getActiveSidebar();
      }
    },
    methods: {
        setActive: function (menuItem) {
            console.log(menuItem);

            this.sidebarDao.setActiveSidebar(menuItem);

            // now fire an event that this was selected
            this.$bus.$emit('setActiveSidebar', menuItem);
        },
        isActive: function (menuItem) {
          console.log("isActive?", menuItem);
          return this.selectedItem.id == menuItem.id;
        }
    },
    created: function() {
      var menuItem = this.menuItems[0];

      // set the default value
      this.sidebarDao.setActiveSidebar(menuItem);

      // fire an event for the default selected item
      this.$bus.$emit('setActiveSidebar', menuItem);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #left-sidebar {
    overflow-y: auto;
    padding: 2em;
    width:20%;
    flex: 0 0 auto;
    border: thin solid black;
  }

  .bold {
    font-weight:bold;
  }
</style>
