<template>
  <div id="mirror">
    <div class="clock">
      <p v-if="clock.hours">{{clock.hours}} : {{clock.minutes}} : {{clock.seconds}} {{clock.amPm}}</p>
    </div>
    <div class="weather">
      <div class="today-weather">
        <h2>{{weather.location}}</h2>
        <img :src="weather.icon"/> <span class="current-temp">   {{weather.currentTemp}} &deg;F</span> <span>{{weather.high}} | {{weather.low}}</span>
        <br/><span>{{weather.description}}</span>
      </div>
      <br/>
      <br/>
      <span v-for="day in weather.forecast">
        <p><img :src="day.icon" height="25px" width="25px"/> {{day.day}} {{day.description}} {{day.high}} | {{day.low}}</p>
      </span>
    </div>
  </div>
</template>

<script>
  import keys from '../conf/keys.js';
  export default {
    name: 'Mirror',
    data () {
      return {
        msg: 'This is the Mirror component',
        wunderground: keys.wunderground,
        clock: {
          hours:'',
          minutes:'',
          seconds:'',
          amPm:''
        },
        weather: {
          high:'',
          low:'',
          icon:'',
          forecast: []
        }
      }
    },
    computed: {

    },
    methods: {
      updateDateTime() {
          let now = new Date();
          let hours24 = this.getZeroPad(now.getHours());

          this.clock.minutes = this.getZeroPad(now.getMinutes());
          this.clock.seconds = this.getZeroPad(now.getSeconds());
          this.clock.hours = hours24 % 12 || 12;

          this.clock.amPm = this.determineAmPm(hours24);
      },
      determineAmPm(hours) {
        return hours >= 12 ? 'PM' : 'AM';
      },
      getZeroPad(num) {
        return (parseInt(num, 10) >= 10 ? '' : '0') + num;
      },
      getWeather() {
          let conditionsUrl = 'http://api.wunderground.com/api/' + this.wunderground + '/conditions/q/14450.json';
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
        let forecastUrl = 'http://api.wunderground.com/api/' + this.wunderground + '/forecast/q/14450.json';

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

            console.log(weatherDays);

            this.weather.forecast = weatherDays;

            this.weather.high = weatherDays[0].high;
            this.weather.low = weatherDays[0].low;

          });
        }
    },
    created: function() {
        this.getWeather();
        this.getForecast();
        this.updateDateTime();
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
    background-color: black;
  }

  .clock, .weather {
    color: white;
  }

  .current-temp {
    font-size: 2em;
  }
</style>
