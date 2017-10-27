<template>
  <div id="the-body">
    <left-sidebar></left-sidebar>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'TheBody',
    data () {
      return {
        msg: 'this is the body'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #the-body {
    margin: 75px auto 0;
    overflow: hidden;
    border: medium solid black;
    width:100%;
    height:100%;
  }
</style>
