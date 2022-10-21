<template>
  <div>
    <div class="auth-wrapper auth-v1">
      <div class="auth-inner">
        <v-card class="auth-card">
          <!-- title -->
          <v-card-text class="text-center">
            <p class="text-2xl font-weight-semibold text--primary mb-2">Adventure starts here 🚀</p>
          </v-card-text>
          <v-alert dense outlined text type="error" v-if="msg" class="mx-16">{{ msg }}</v-alert>
          <!-- signup form -->
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="signup">
              <v-card>
                <v-select
                v-model="role"
                :items="roles"
                outlined
                dense
                label="Select Role"
                :rules="[rules.required]"
                >
                </v-select>
              </v-card>
              <v-text-field
                v-model="email"
                dense
                outlined
                label="Email"
                :rules="[rules.required, rules.validEmail]"
              ></v-text-field>
              <v-text-field v-model="uname" outlined dense label="Username" :rules="nameRules"></v-text-field>
              <v-text-field
                v-model="password"
                dense
                outlined
                :type="show ? 'text' : 'password'"
                :rules="passwordRules"
                label="Password"
                counter
                :append-icon="show ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append="show = !show"
              ></v-text-field>

              <v-checkbox v-model="checkbox" hide-details ="[v => !!v || 'You must agree to continue!']">
                <template #label>
                  <div class="d-flex align-center flex-wrap">
                    <span class="me-2">I agree to</span><a href="javascript:void(0)">privacy policy &amp; terms</a>
                  </div>
                </template>
              </v-checkbox>

              <v-btn block color="primary" class="mt-6" :disabled="!valid" type="submit" :loading="isLoading">
                Sign Up
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </div>

      <!-- background triangle shape  -->
      <img
        class="auth-mask-bg"
        height="190"
        :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
        alt="auth-mask-bg"
      />

      <!-- tree -->
      <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png" alt="tree"></v-img>

      <!-- tree  -->
      <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png" alt="tree"></v-img>
    </div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="375">
        <v-card>
          <v-card-title class="text-h6"> {{ message }} </v-card-title>
          <v-card-text class="subtitle-1">Click <strong>OK</strong> to login</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" text @click="redirect"> ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import API from '@/api'
export default {
  data: () => ({
    valid: true,
    name: '',
    uname: '',
    email: '',
    role:'',
    roles:['Admin','Otheruser'],
    password: '',
    dialog: false,
    checkbox: false,
    show: false,
    rules: {
      required: value => !!value || 'Required.',
      validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    },
    nameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length >= 5) || 'Username must be atleast 5 characters',
      v => /^[a-z0-9_]{5,}$/.test(v) || 'Username can contain lower case, numbers and underscore',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v =>
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,15}$/.test(v) ||
        'Password is atleast 8 characters long, has at least one uppercase letter, one lowercase letter, one digit and one special character',
    ],
    msg: '',
    message: '',
    isLoading: false,
  }),
  methods: {
    async signup() {
      this.isLoading = true
      const valid = this.$refs.form.validate()
      if (valid) {
        try {
          let data = {
            username: this.uname,
            emailId: this.email,
            password: this.password,
            role: this.role,
            is_admin: true,
            is_otheruser: true,
          }
          await API.register(data)
            .then(res => {
              this.message = res.message
              this.dialog = true
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
              if (error.response.data.username[0]) {
                this.msg = error.response.data.username[0]
              } 
            })
        } catch (error) {
          this.isLoading = false
          if (error.response.data.username[0]) {
            this.msg = error.response.data.username[0]
          } 
        }
      }
    },
    redirect() {
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
