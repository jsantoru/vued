<template>
  <div id="main-content">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  data () {
      return {
        msg: 'This is the main content'
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main-content {
    float:left;
    border: thin solid red;
    height:100%;
    width:80%;
    overflow:auto;
  }
</style>
