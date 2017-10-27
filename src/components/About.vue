<template>
  <div id="about">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'About',
    data () {
      return {
        msg: 'This is the About component'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #about {
    overflow-y: auto;
    padding: 2em;
    width:80%;
    flex: 0 0 auto;
    border: thin solid black;
  }
</style>
