<template>
  <v-card class="mb-4 pt-4 mt-4">
    <!-- Empty v-card! -->
    <v-card-text>
    </v-card-text>
    <v-card-text>
      Process status: {{ status }}
    </v-card-text>
    <v-container>
      <v-row  class="fill-height" align-content="center" justify="center">
        <v-col cols="12" v-if="status ==='running'">
          <v-progress-linear
            indeterminate
            color="primary"
          ></v-progress-linear>
        <v-col cols="12">
            <v-btn color="primary" @click="cancel" block> Cancel </v-btn>
        </v-col>
        </v-col>
        <v-col cols="12" v-if="status ==='failed' || status ==='accepted'">
          <v-progress-linear
            v-model="valueDeterminate"
            color="primary"
          ></v-progress-linear>
        <v-col cols="12">
          <v-btn color="primary" @click="cancel" block v-if="status!=='successful'"> Cancel </v-btn>
        </v-col>
        </v-col>
        <v-col cols="12" v-if="status ==='successful'">
           <v-btn block color="primary" @click="dialog = true">Get results</v-btn>
          <bulletin-window
            v-if="dialog"
            :jobId="jobId"
            :outputName="outputName"
            @close-dialog="dialog = false"
          ></bulletin-window>
        </v-col>
      </v-row>
    </v-container>
    <p v-if="status ==='failed'"
       class="px-5 pb-3 flex-grow-1 overflow-y-auto">
       Process <b>failed</b> due to an unexpected error:<br/>
       If the problem persists, please <a :href="content">contact</a> the FORCOAST-team
    </p>
  </v-card>
</template>
<script>

import getStatus  from "@/lib/wps/getStatus"
import bulletinWindow from "@/components/bulletin-window";
import { mapState } from "vuex"
const _ = require('lodash')

export default {
  components: {
    bulletinWindow
  },
  data() { 
    return {
      status: "accepted",
      valueDeterminate: 0,
      getStatusAttempt: 0,
      dialog: false,
      jobId: "",
    }
  },
  props: {
    date: {
      type: String, 
      required: true,
    }, 
    firstStatus: {
      type: String,
      required: true
    },
    statusLink: {
      type: String,
      required: true
    },
    outputLink: {
      type: String,
      required: false
    },
    outputName: {
      type: String,
      required: false
    },    
  },
  computed:{
    ...mapState("layers", ["selectedService"]),
    content(){
      return 'mailto:' + this.selectedService.contact_partner + '?cc=info@forcoast.eu, vasile.craciunescu@terrasigna.com&subject=Unknown%20error%20' + this.selectedService.name + '&body=Dear%20FORCOAST-team%2C%0A%0AThe%20service-run%20with%20ID%3A%0A' + this.jobId + '%0A%20is%20encountering%20an%20unexpected%20error,%20please%20check%20that%20the%20service%20is%20not%20experience%20any%20interruption%20and%20that%20the%20necessary%20data%20sources%20are%20operational.%0A%0ABest%20regards%2C%20a%20FORCOAST-user%0A%0A'
    }
  },
  methods: {
    async getProcessStatus() {
      const statusTemp = await getStatus(this.statusLink)
      if (this.status !== "cancelled") {
      this.status = statusTemp
      this.jobId = this.statusLink.substring(this.statusLink.lastIndexOf('/') + 1);
      this.getStatusAttempt = this.getStatusAttempt + 1
      }
    },
    cancel() {
      this.status = "cancelled"
    }
  },
  mounted() { 
    this.status = this.firstStatus
    if (this.status === "accepted") {
        this.getStatusAttempt = 1
      }
  },
  watch: {
    getStatusAttempt() {
     
      if (this.getStatusAttempt > 0 && this.getStatusAttempt < 1000 ) {
        if (this.status === "accepted" || this.status === "running") {
          _.delay(()=> this.getProcessStatus(), 5000 )  
      }
      }

    }
  }

};
</script>
