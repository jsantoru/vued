<template>
  <div id="main-content">
    <h1>{{ msg }}</h1>
    <ul class="list-group">
      <li v-for="user in users" class="list-group-item list-group-item-action">{{getUserDisplayName(user)}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  data () {
      return {
        msg: 'This is the main content',
        users: []
      }
  },
  methods: {
      getUserDisplayName: function(user) {
          return user.name + " (" + user.email + ")";
      }
  },
  // when this component is created
  created: function() {
      this.$http.get("https://jsonplaceholder.typicode.com/users")
        .then(function(response) {
            this.users = response.data;
          });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main-content {
    overflow-y: auto;
    padding: 2em;
    width:80%;
    flex: 0 0 auto;
    border: thin solid black;
  }
</style>
