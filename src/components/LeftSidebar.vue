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
        store: this.$root.$data.store,
        msg: 'This is the left sidebar',
        selectedItemId: 1,
        menuItems: [
          {
              id: 1,
              name: "One"
          },
          {
              id: 2,
              name: "Two"
          },
          {
            id: 3,
            name: "Three"
          },
          {
            id: 4,
            name: "Four"
          }
        ]
      }
    },
    methods: {
        setActive: function (menuItem) {
            console.log(menuItem);
            this.selectedItemId = menuItem.id;

            this.store.setActiveSidebar(menuItem.name);

            // now fire an event that this was selected
            this.$bus.$emit('setActiveSidebar', menuItem);
        },
        isActive: function (menuItem) {
          console.log("isActive?", menuItem);
          return this.selectedItemId == menuItem.id;
        }
    },
    created: function() {
      var menuItem = this.menuItems.find(menuItem => menuItem.id === this.selectedItemId);

      // set the default value
      this.store.setActiveSidebar(menuItem.name);

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
