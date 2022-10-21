<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <video-player :videoURL="videoURL" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue'

export default {
  name: "App",
  components: {
    VideoPlayer,
  },
  data: () => ({
    videoURL : '',
  }),
  methods: {
    changeVideoPlaying(url) {
      console.log("local",localStorage.getItem('src'))
      this.videoURL = url;
    },
  },
};
</script>

<style>
body {
  font-family: Roboto;
}
</style>