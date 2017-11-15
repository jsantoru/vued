<template>
  <div>
    <div class="date">
      <div>{{date.dayOfWeek}}</div>
      <span>{{date.month}} {{date.day}}, {{date.year}}</span>
    </div>
    <div class="time">
      <span v-if="time.hours">{{time.hours}}:{{time.minutes}} {{time.amPm}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Clock',
    data () {
      return {
        time: { hours:'', minutes:'', seconds:'', amPm:'' },
        date: { dayOfWeek:'', month:'', day:'', year:'' }
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

        this.time.minutes = this.getZeroPad(now.getMinutes());
        this.time.seconds = this.getZeroPad(now.getSeconds());
        this.time.hours = hours24 % 12 || 12;

        this.time.amPm = this.determineAmPm(hours24);

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
      }
    },
    created: function() {
      let ms_1_sec = 1000;
      let ms_60_secs = ms_1_sec * 60;

      this.updateDateTime();
      setInterval(this.updateDateTime, ms_60_secs);
    }
  }
</script>

<style scoped>
  .date {
    font-size: 2em;
  }

  .time {
    font-size: 4em;
  }
</style>
