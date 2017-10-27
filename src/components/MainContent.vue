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
    width: 100%;
  }
</style>
