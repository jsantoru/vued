<template>
  <div v-if="commute.distance" class="commute">
    <div class="commute-icon">
      <img src="../../assets/traffic.svg" width="42px" height="42px"/>
    </div>
    <div class="commute-details">
      <div class="commute-duration">
        <span><b>{{commute.durationInTraffic}}</b> ({{durationDifferenceDisplay}}) to Work ({{commute.distance}})</span>
      </div>
      <div class="commute-destination">
        <span>{{commute.destination}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import keys from '../../conf/keys.js';
  export default {
    name: 'Commute',
    data () {
      return {
        commute: {distance: '', durationInTraffic: '', duration: ''}
      }
    },
    computed: {
      durationDifference: function() {
        // 17 mins - 15 mins
        let durationMins = Number.parseInt(this.commute.duration);
        let durationInTrafficMins = Number.parseInt(this.commute.durationInTraffic);
        return durationInTrafficMins - durationMins;
      },
      durationDifferenceDisplay: function() {
        let fasterSlower = "slower";
        if(this.durationDifference < 0) {
          fasterSlower = "ahead";
        }
        return Math.abs(this.durationDifference) + " mins " + fasterSlower;
      }
    },
    methods: {
      updateCommuteInfo() {
        let origin = (this.$route.query.origin) ? this.$route.query.origin : 'Fairport NY';
        let destination = (this.$route.query.destination) ? this.$route.query.destination : 'Rochester NY';

        this.commute.origin = origin;
        this.commute.destination = destination;

        console.log(origin);
        console.log(destination);

        var directionsService = new google.maps.DirectionsService();
        var request = {
          origin: origin,
          destination: destination,
          durationInTraffic: true,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        var _this = this;
        directionsService.route(request, function(response, status) {
          if(status == google.maps.DirectionsStatus.OK) {
            let legInfo = response.routes[0].legs[0];

            _this.commute.distance = legInfo.distance.text;
            _this.commute.durationInTraffic = legInfo.duration_in_traffic.text;
            _this.commute.duration = legInfo.duration.text;

            console.log(_this.commute.distance);
            console.log(_this.commute.duration);
          }
        });
      }
    },
    created: function() {
      let ms_1_sec = 1000;
      let ms_60_secs = ms_1_sec * 60;
      let ms_5_mins = ms_60_secs * 5;

      var _this = this;

      // update commute info every 5 minutes
      // hack to wait until the google api is loaded
      setTimeout(function() {
        _this.updateCommuteInfo();
      }, ms_1_sec);

      setInterval(this.updateCommuteInfo, ms_5_mins);
    }
  }
</script>

<style scoped>
  .commute-icon {
    float:right;
    -webkit-filter: invert(100%);
    /*padding-right: 15px;*/
    padding-top:2px;
    padding-left: 15px;
    text-align:left;
  }

  .commute-duration {
    float:right;
    text-align:right;
  }

  .commute-destination {
    float:right;
  }
</style>
