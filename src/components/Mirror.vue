<template>
  <div id="mirror">
    <div class="top">
    <div class="right">
      <clock></clock>
      <commute></commute>
    </div>
    <div class="left">
      <div class="left-top">
        <h2>{{weather.location}}</h2>
      </div>
      <div class="left-middle">
        <div class="left-middle-left">
          <div class="main-icon">
            <img v-if="weather.iconName":src="weather.icon" width="72px" height="72px"/>
          </div>
          <div class="description">
            <span>{{weather.description}}</span>
          </div>
        </div>
        <div class="left-middle-right">
          <div class="current-temp">{{weather.currentTemp}}&deg;</div>
          <div class="highlow">
            {{weather.high}} | {{weather.low}}
          </div>
        </div>
      </div>
      <div class="left-bottom">
        <div v-for="day in forecast">
          <div class="left-bottom-left">
            {{day.day}}
          </div>
          <div class="left-bottom-right">
            {{day.high}} | {{day.low}}
          </div>
          <div class="left-bottom-middle">
            <img :src="day.icon" height="25px" width="25px"/>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="bottom">
      <!--<div class="quote" v-html="quote.html"></div>-->
      <div class="quote">{{quote.text}}</div>
      <p class="author">- {{quote.author}}</p>
    </div>
  </div>
</template>

<script>
  /*
   * USAGE: http://localhost:5000/#/mirror?zip=10990&origin=fairport%20ny&destination=pittsford%20ny
   */
  import keys from '../conf/keys.js';
  import Commute from './mirror/Commute';
  import Clock from './mirror/Clock';

  export default {
    name: 'Mirror',
    components: {
      'commute': Commute,
      'clock': Clock
    },
    data () {
      return {
        msg: 'This is the Mirror',
        zip: '',
        weather: { high:'', low:'', icon:'' },
        forecast: [],
        quote: { html: '', author: '' }
      }
    },
    computed: {
    },
    methods: {
      getWeather() {
          let conditionsUrl = 'http://api.wunderground.com/api/' + keys.wunderground + '/conditions/q/' + this.zip + '.json';
          this.$http.get(conditionsUrl)
            .then(function(response) {
              let now = response.body.current_observation;
              console.log(now);

              this.weather.location = now.display_location.full;
              this.weather.currentTemp = now.temp_f;
              this.weather.description = now.weather;
              this.weather.iconName = now.icon;
              this.weather.icon = now.icon_url;
              // sunrise
              // sunset
            });
      },
      getForecast() {
        let forecastUrl = 'http://api.wunderground.com/api/' + keys.wunderground + '/forecast/q/' + this.zip + '.json';

        this.$http.get(forecastUrl)
          .then(function (response) {

            console.log("RESPONSE", response);
            let weatherDays = [];
            let forecastArray = response.body.forecast.simpleforecast.forecastday;
            console.log(forecastArray[0]);

            forecastArray.forEach(function(day) {
              console.log(day);
              let weather = {};
              weather.high = day.high.fahrenheit;
              weather.low = day.low.fahrenheit;
              weather.description = day.conditions;
              weather.icon = day.icon_url;
              weather.day = day.date.weekday_short;

              weatherDays.push(weather);
            });

            this.forecast = weatherDays;
            this.weather.high = weatherDays[0].high;
            this.weather.low = weatherDays[0].low;
          });
        },
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
      },
    },
    created: function() {
      let ms_1_sec = 1000;
      let ms_30_secs = ms_1_sec * 30;
      let ms_60_secs = ms_1_sec * 60;
      let ms_5_mins = ms_60_secs * 5;
      let ms_1_hour = ms_60_secs * 60;

      var _this = this;
      // grab the zip from the query params if it was provided
      this.zip = (this.$route.query.zip) ? this.$route.query.zip : '14450';

      this.getWeather();
      setInterval(this.getWeather(), ms_1_hour);

      this.getForecast();
      setInterval(this.getForecast(), ms_1_hour);

      this.updateQuote();
      setInterval(this.updateQuote, ms_1_hour);
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

  .left-top {
    text-align:center;
    overflow:visible;
  }

  .left-middle-left {
    float:left;
    text-align:center;
    width:85px;
  }

  .left-middle-right {
    float:right;
    width:85px;
  }

  .left-bottom {
    float:right;
    width:100%;
    padding-top:30px;
  }

  .left-bottom-left {
    float:left;
    width:45px;
  }

  .left-bottom-middle {
    text-align:center;
  }

  .left-bottom-right {
    float:right;
    width:60px;
    text-align:right;
  }

  /* */

  .current-temp {
    font-size: 3em;
    padding-left:5px;
  }

  .highlow {
    text-align:center;
    padding-right:10px;
  }

  .bottom {
    float:left;
    clear:left;
    width:100%;
    padding-top:50px;
    text-align: center;
  }

  .quote {
    font-style:italic;
  }

  div {
    /*border: solid white 1px;*/
  }

</style>
