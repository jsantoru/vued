<template>
  <div id="mirror">
    <div class="top">
    <div class="right">
      <div class="date">
        <div>{{date.dayOfWeek}}</div>
        <span>{{date.month}} {{date.day}}, {{date.year}}</span>
      </div>
      <div class="clock">
        <span v-if="clock.hours">{{clock.hours}}:{{clock.minutes}} {{clock.amPm}}</span>
      </div>
    </div>
    <div class="left">
      <div class="left-top">
        <h2>{{weather.location}}</h2>
      </div>
      <div class="left-middle">
        <div class="left-middle-left">
          <div class="main-icon">
            <img :src="weather.icon" width="72px" height="72px"/>
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
          <div class="left-bottom-middle">
            <img :src="day.icon" height="25px" width="25px"/>

            <div class="left-bottom-right">
              {{day.high}} | {{day.low}}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="bottom">
      <div class="quote" v-html="quote.html"></div>
      <p class="author">- {{quote.author}}</p>
    </div>
  </div>
</template>

<script>
  import keys from '../conf/keys.js';

  export default {
    name: 'Mirror',
    data () {
      return {
        msg: 'This is the Mirror',
        clock: { hours:'', minutes:'', seconds:'', amPm:'' },
        weather: { high:'', low:'', icon:'' },
        forecast: [],
        date: { dayOfWeek:'', month:'', day:'', year:'' },
        quote: { html: '', author: '' },
        zip: ''
      }
    },
    computed: {

    },
    methods: {
      updateDateTime() {
          let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          let months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

          let now = new Date();
          let hours24 = this.getZeroPad(now.getHours());

          this.clock.minutes = this.getZeroPad(now.getMinutes());
          this.clock.seconds = this.getZeroPad(now.getSeconds());
          this.clock.hours = hours24 % 12 || 12;

          this.clock.amPm = this.determineAmPm(hours24);

          this.date.dayOfWeek = days[now.getDay()];
          this.date.day = now.getDate();
          this.date.month = months[now.getMonth()];
          this.date.year = now.getFullYear();
      },
      determineAmPm(hours) {
        return hours >= 12 ? 'PM' : 'AM';
      },
      getZeroPad(num) {
        return (parseInt(num, 10) >= 10 ? '' : '0') + num;
      },
      getWeather() {
          let conditionsUrl = 'http://api.wunderground.com/api/' + keys.wunderground + '/conditions/q/' + this.zip + '.json';
          this.$http.get(conditionsUrl)
            .then(function(response) {
              let now = response.body.current_observation;
              console.log(now);

              this.weather.location = now.display_location.full;
              this.weather.currentTemp = now.temp_f;
              this.weather.description = now.weather;
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
          let url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&' + new Date().getTime();

          this.$http.get(url)
            .then(function(response) {
                let quote = response.body[0];
                this.quote.html = quote.content;
                this.quote.author = quote.title;
               //console.log(response.body);
            });
      }
    },
    created: function() {
      // grab the zip from the route if it was provided
      this.zip = (this.$route.params.zip) ? this.$route.params.zip : '14450';

      this.getWeather();
      this.getForecast();

      this.updateDateTime();
      setInterval(this.updateDateTime, 60000);

      this.updateQuote();
      setInterval(this.updateQuote, 30000);
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

  .left-middle-left {
    float:left;
    padding:2px;
    text-align:center;
  }

  .left-middle-right {
    float:right;
    padding:2px;
  }

  .left-bottom {
    float:right;
    width:100%;
    padding-top:30px;
  }

  .left-bottom-left {
    float:left;
  }

  .left-bottom-middle {
    text-align:center;
  }

  .left-bottom-right {
    float:right;
  }

  /* */

  .date {
    font-size: 2em;
  }

  .clock {
    font-size: 4em;
  }

  .current-temp {
    font-size: 3em;
    padding-left:5px;
  }

  .highlow {
    text-align:center;
    padding-right:10px;
  }

  .high {
    float:left;
    padding-left:0px;
  }

  .low {
    float:right;
    padding-right:20px;
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
