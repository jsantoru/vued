<template>
  <div id="top-nav">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      msg: 'This is the Nav'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #top-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height:75px;
    text-align: center;
    border-bottom: thin solid black;
  }
</style>
