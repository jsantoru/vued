<template>
  <div id="mirror">
    <h1>{{ msg }}</h1>
    <p v-if="hours">{{ hours }} : {{ minutes }} : {{ seconds }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Mirror',
    data () {
      return {
        msg: 'This is the Mirror component',
        hours:'',
        minutes:'',
        seconds:''
      }
    },
    methods: {
      updateDateTime() {
          let now = new Date();
          this.hours = now.getHours();
          this.minutes = now.getMinutes();
          this.seconds = now.getSeconds();
      }
    },
    created: function() {
        setInterval(this.updateDateTime, 1000);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #mirror {
    overflow-y: auto;
    padding: 2em;
    width:80%;
    flex: 0 0 auto;
    border: thin solid black;
  }
</style>
