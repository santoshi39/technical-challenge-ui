<template>
  <v-card>
    <v-card-title>
      Uploaded Data
      <v-spacer></v-spacer>
      <v-form v-model="valid" ref="form" lazy-validation @submit.prevent="generate()">
        <v-row>
          <v-col>
            <v-card>
              <v-text-field
                v-model="startdate"
                type="date"
                outlined
                hide-details
                dense
                label="Uploaded Date"
                :rules="rules"
              ></v-text-field>
            </v-card>
          </v-col>
          <v-col>
            <v-btn color="primary" type="submit" :disabled="!valid">show</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-title>
    <ag-grid-vue
      style="width: 100%; height: 380px"
      class="ag-theme-alpine ag-theme-alpine --ag-widget-horizontal-spacing:'block'"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
    >
    </ag-grid-vue>
    <v-snackbar v-model="snackbar" timeout="4000" absolute top :color="color" outlined center>
      {{ msg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="error" x-small icon @click="snackbar = false" v-bind="attrs"> <v-icon>mdi-close</v-icon> </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import API from '@/api'
// import VueCoreVideoPlayer from 'vue-core-video-player';
export default {
  name: 'App',
  data: () => ({
      valid: true,
      rules: [v => !!v || 'Field is required'],
      columnDefs: [],
      links : [],
      rowData: null,
      columnApi: null,
      defaultColDef: {
        filter: true,
        initialwidth: 100,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
      },
      startdate: '',
      color: '',
      snackbar: false,
      msg: '',
      src : ''
    }),
  components: {
    AgGridVue,
    // VueCoreVideoPlayer
  },
  async created() {},
  methods: {
    async generate() {
      if (this.$refs.form.validate()) {
        let data = {
          uploaded_on: this.startdate,
        }
        await API.viewData(data)
          .then(res => {
            var keys = Object.keys(res.response[0]);
            this.rowData = res.response
            this.columnDefs = keys.map(item => {
                if (item == 'vlink'){ return { headerName: item, field: item, cellRenderer: (params) => {
                    const route = {
                    name: "Video",
                    params: { item: params.value }
                    };

                    const link = document.createElement("a");
                    link.href = this.$router.resolve(route).href;
                    link.innerText = params.value;
                    link.addEventListener("click", e => {
                    e.preventDefault();
                    this.$router.push('/video');
                    localStorage.setItem('src', link.innerText)
                    // this.$router.push({path:'/video',query:{src:link}});
                    });
                    
                    console.log("links", (link.innerText).toString())
                    return link;
                },sortable: true }}
                else{return { headerName: item, field: item, sortable: true }}
            })
            console.log(this.columnDefs)
          })
          .catch(err => {
            this.msg = err.response.data.message
            this.color = 'error'
            this.snackbar = true
          })
      }
    },
  },
}
</script>
<style lang="scss">
@import '~ag-grid-community/dist/styles/ag-grid.css';
@import '~ag-grid-community/dist/styles/ag-theme-alpine.css';
</style>