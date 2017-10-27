<template>
  <div id="left-sidebar">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'LeftSidebar',
    data () {
      return {
        msg: 'This is the left sidebar'
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
</style>
