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
    flex: 1;
    padding: 2em;
    display: flex;
    overflow:hidden;
    padding-top: 70px;
  }

  * {
    flex: 0 0 auto;
  }
</style>
