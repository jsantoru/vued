<template>
  <div id="left-sidebar">
    <h3>Sidebar header</h3>
    <ul class="nav nav-pills flex-column">
      <li v-for="menuItem in menuItems" nav-item>
        <a class="nav-link" href="#" v-on:click="setActive(menuItem)" v-bind:class="{'bold': isActive(menuItem)}">{{menuItem.name}}</a>
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

            // now fire an event that this was selected
            this.$bus.$emit('setActiveSidebar', menuItem);
        },
        isActive: function (menuItem) {
          console.log("isActive?", menuItem);
          return this.selectedItemId == menuItem.id;
        }
    },
    created: function() {
      // fire an event for the default selected item
      this.$bus.$emit('setActiveSidebar', this.menuItems.find(menuItem => menuItem.id === this.selectedItemId));
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
