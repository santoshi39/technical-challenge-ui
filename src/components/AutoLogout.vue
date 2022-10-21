<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400">
        <v-card class="text-center">
          <v-card-title class="text-h5 text--primary"> Your Session will expire soon </v-card-title>
          <v-card-text>
            You're being timed out due to inactivity. Please choose to stay signed. Otherwise, you will logged off
            automatically.
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
    warningTimer: null,
    logoutTimer: null,
  }),
  mounted() {
    this.events.forEach(event => {
      window.addEventListener(event, this.resetTimer)
    })
    this.setTimers()
  },
  destroyed() {
    this.events.forEach(event => {
      window.removeEventListener(event, this.resetTimer)
    })
    this.resetTimer()
  },
  methods: {
    setTimers() {
      this.warningTimer = setTimeout(this.warningMessage, 570000)
      this.logoutTimer = setTimeout(this.logoutUser, 600000)
      this.dialog = false
    },
    warningMessage() {
      this.dialog = true
    },
    logoutUser() {
      this.$store.dispatch('logout').then(this.$router.push('/login'))
    },
    resetTimer() {
      clearTimeout(this.warningTimer)
      clearTimeout(this.logoutTimer)
      this.setTimers()
    },
  },
}
</script>