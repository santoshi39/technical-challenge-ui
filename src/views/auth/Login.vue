<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/images/logo.png')"
              max-height="200px"
              max-width="200px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="mb-2">Please sign-in to your account and start the adventure</p>
        </v-card-text>
        <v-alert dense outlined text type="error" class="mx-16" v-if="this.msg">{{ msg }}</v-alert>
        <!-- login form -->
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login()">
            <v-text-field v-model="username" :rules="nameRules" class="mb-1" label="Username" outlined></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              class="mb-1"
              label="Password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              @click:append="isPasswordVisible = !isPasswordVisible"
              counter
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox label="Remember Me" hide-details class="me-3 mt-1"> </v-checkbox>

              <!-- forgot link -->
              <router-link :to="{ name: 'forgotPassword' }">Forgot Password?</router-link>
            </div>

            <v-btn block color="primary" class="mt-6" type="submit" :disabled="!valid" :loading="isLoading">
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
      alt="auth-mask-bg"
    />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png" alt="tree"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png" alt="tree"></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline

import API from '@/api'
import axios from 'axios'
export default {
  data: () => ({
    valid: true,
    msg: '',
    username: '',
    nameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length >= 5) || 'Username must be alteast 5 characters',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be alteast 8 characters',
    ],
    password: '',
    isPasswordVisible: false,
    isLoading: false,
  }),
  methods: {
    async login() {
      let data = {
        username: this.username,
        password: this.password,
      }
      if (this.$refs.form.validate()) {
        this.isLoading = true
        await API.login(data)
          .then(res => {
            this.isLoading = false
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.access_token}`
            let authData = {
              username: res.username,
              role: res.role,
              access: res.access_token,
              
            }
            localStorage.setItem('auth-token', res.access_token)
            localStorage.setItem('auth-data', JSON.stringify(authData))
            this.$router.push('/dashboard')
          })
          .catch(err => {
            this.isLoading = false
            this.msg = err.response.data.detail
          })
      }
    },
  },
  computed: {},
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
