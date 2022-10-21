<template>
  <div>
    <v-card class="mx-auto" width="600px">
      <v-form enctype="multipart/form-data" @submit.prevent="upload()" ref="form" v-model="valid" lazy-validation>
        <v-card-title>
          <h3>Upload Test Data file</h3>
        </v-card-title>
        <v-card-text>
          <v-file-input
            v-model="file"
            label="Upload Excel File"
            outlined
            dense
            accept=".xlsx, .xls"
            ref="file"
            id="file"
            :rules="rules"
          >
          </v-file-input>
          <v-row justify="end" class="mr-1 mb-1">
            <v-btn color="primary" small type="submit" :disabled="!valid">Submit</v-btn>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
    <!-- <div id="preview" style="overflow-x: auto" class="mt-5"></div> -->
    <v-snackbar v-model="snackbar" timeout="3000" absolute top :color="color" outlined centered>
      {{ msg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="error" x-small icon @click="snackbar = false" v-bind="attrs"> <v-icon>mdi-close</v-icon> </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="overlay" z-index="6">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import API from '@/api'
export default {
  data: () => ({
    overlay: false,
    file: null,
    valid: true,
    snackbar: false,
    msg: '',
    color: '',
    rules: [v => !!v || 'Field is required'],
  }),
  methods: {
    async upload() {
      const valid = this.$refs.form.validate()
      if (valid) {
        this.overlay = true
        let formData = new FormData()
        formData.append('file', this.file)
        await API.upload(formData)
          .then(res => {
            this.$refs.form.reset()
            this.overlay = false
            this.color = 'success'
            this.snackbar = true
            this.msg = res.message
            this.$router.push('/viewData')
          })
          .catch(err => {
            this.overlay = false
            this.color = 'error'
            this.snackbar = true
            this.msg = err.response.data.message
          })
      }
    },
  },
}
</script>

<style>


</style>