<template>
  <div>
    <!--<div class="quote" v-html="quote.html"></div>-->
    <div class="quote">{{quote.text}}</div>
    <p class="author">- {{quote.author}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Quote',
    data () {
      return {
        quote: { html: '', author: '' }
      }
    },
    computed: {
    },
    methods: {
      updateQuote() {
        //let url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&' + new Date().getTime();
        //let url = 'https://talaikis.com/api/quotes/random/';
        let url = 'http://quotes.rest/qod.json?category=inspire';

        this.$http.get(url)
          .then(function(response) {
            //let quote = response.body[0];
            //this.quote.html = quote.content;
            //this.quote.author = quote.title;

            //let quote = response.body;
            let quote = response.body.contents.quotes[0];
            this.quote.text = quote.quote;
            this.quote.author = quote.author;
          });
      }
    },
    created: function() {
      let ms_1_sec = 1000;
      let ms_60_secs = ms_1_sec * 60;
      let ms_1_hour = ms_60_secs * 60;

      this.updateQuote();
      setInterval(this.updateQuote, ms_1_hour);
    }
  }
</script>

<style scoped>
  .quote {
    font-style:italic;
  }
</style>
