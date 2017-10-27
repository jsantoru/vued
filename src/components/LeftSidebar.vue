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
          }
        ]
      }
    },
    methods: {
        setActive: function (menuItem) {
            console.log(menuItem);
            this.selectedItemId = menuItem.id;
        },
        isActive: function (menuItem) {
          console.log("isActive?", menuItem);
          return this.selectedItemId == menuItem.id;
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #left-sidebar {
    float:left;
    border-right: thin solid black;
    width: 20%;
    height: 100%;
    overflow:auto;
  }

  .bold {
    font-weight:bold;
  }
</style>
