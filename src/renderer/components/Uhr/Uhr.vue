<template>
  <v-sheet class="fill-height elevation-2" rounded>
    <div id="uhr">
      <ul>
        <li>{{ weekday }}</li>
        <li>{{ date }}</li>
        <li>{{ time }}</li>
      </ul>
    </div>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      time: '',
      date: '',
      weekday: ''
    }
  },
  mounted() {
    this.getTimeAndDate()
  },
  methods: {
    getTimeAndDate: function() {
      var now = new Date()
      var weekdays = [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag'
      ]
      var year = now.getFullYear()
      var month = now.getMonth()
      var day = now.getDate()
      var weekday = weekdays[now.getDay()]

      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day

      var hours = now.getHours()
      var minutes = now.getMinutes()
      var seconds = now.getSeconds()

      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      var computedTime = hours + ':' + minutes + ':' + seconds + ' Uhr'

      var computedDate = `${day}.${month}.${year}`

      this.time = computedTime
      this.date = computedDate
      this.weekday = weekday

      window.requestAnimationFrame(this.getTimeAndDate)
    }
  }
}
</script>

<style lang="scss" scoped>
#uhr {
  display: flex;
  flex-basis: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.5vw;
  font-size: 2vw;

  ul {
    padding: 0;
    flex-basis: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    align-items: center;
  }
}
</style>
