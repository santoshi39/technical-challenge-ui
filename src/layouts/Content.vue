<template>
  <v-app>
    <vertical-nav-menu :is-drawer-open.sync="isDrawerOpen"></vertical-nav-menu>

    <v-app-bar app flat absolute color="transparent">
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-6">
          <!-- Left Content -->
          <v-app-bar-nav-icon class="d-block d-lg-none me-2" @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>

          <v-spacer></v-spacer>
          <!-- <v-badge color="green" overlap class="ms-3">
            <v-icon> mdi-bell-outline </v-icon>
          </v-badge> -->
      
          <!-- <v-btn icon>
            <v-badge color="success" dot overlap class="ms-3">
              <v-icon> mdi-account-outline </v-icon>
            </v-badge>
          </v-btn> -->
          <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align: middle">
            <span class="text--primary font-weight-semibold mb-n1">
              {{ username }}
            </span>
            <small class="text--disabled text-capitalize">{{ role }}</small>
          </div>
          <v-btn icon @click="logout" class="mx-3">
            <v-icon size="30"> mdi-logout </v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <div class="app-content-container pa-5">
        <slot></slot>
      </div>
      <!-- <auto-logout></auto-logout> -->
    </v-main>

    <v-footer app inset color="transparent" absolute height="56" class="px-0">
      <div class="boxed-container w-full">
        <div class="mx-6 d-flex justify-space-between">
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { ref } from '@vue/composition-api'
import VerticalNavMenu from './components/vertical-nav-menu/VerticalNavMenu.vue'
import AutoLogout from '@/components/AutoLogout.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import API from '@/api'
import axios from 'axios'

export default {
  components: {
    VerticalNavMenu,
    // AutoLogout,
  },
  setup() {
    const isDrawerOpen = ref(null)

    return {
      isDrawerOpen,
      year: new Date().getFullYear(),
    }
  },
  data: () => ({
    username: JSON.parse(localStorage.getItem('auth-data')).username,
    role: JSON.parse(localStorage.getItem('auth-data')).role,
  }),
  methods: {
    async logout() {
      let data = {
        access: JSON.parse(localStorage.getItem('auth-data')).acess_token,
      }
      try {
        await API.logout(data)
        localStorage.removeItem('auth-token')
        delete axios.defaults.headers.common['Authorization']
        this.$router.push('/login')
      } catch (error) {
        console.log(error.response.data)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar ::v-deep {
  .v-toolbar__content {
    padding: 0;

    .app-bar-search {
      .v-input__slot {
        padding-left: 18px;
      }
    }
  }
}

.boxed-container {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}
</style>
