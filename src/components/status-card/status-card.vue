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
  </v-card>
</template>
<script>

import getStatus  from "@/lib/wps/getStatus"

import bulletinWindow from "@/components/bulletin-window";
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
