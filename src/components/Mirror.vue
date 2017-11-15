<template>
  <div id="mirror">
    <div class="top">
      <div class="right">
        <clock></clock>
        <commute></commute>
      </div>
      <div class="left">
        <weather></weather>
      </div>
    </div>
    <div class="bottom">
      <quote></quote>
    </div>
  </div>
</template>

<script>
  import keys from '../conf/keys.js';

  import Weather from './mirror/Weather';
  import Clock from './mirror/Clock';
  import Commute from './mirror/Commute';
  import Quote from './mirror/Quote';

  /*
   * USAGE: http://localhost:5000/#/mirror?zip=10990&origin=fairport%20ny&destination=pittsford%20ny
   */
  export default {
    name: 'Mirror',
    components: {
      'weather': Weather,
      'clock': Clock,
      'commute': Commute,
      'quote': Quote
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    created: function() {
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
    background-color: black;
    color: white;
  }

  .left {
    float:left;
  }

  .right {
    float:right;
    text-align:right;
  }

  .bottom {
    float:left;
    clear:left;
    width:100%;
    padding-top:50px;
    text-align: center;
  }

  div {
    /*border: solid white 1px;*/
  }
</style>
