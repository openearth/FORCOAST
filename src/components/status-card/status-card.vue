<template>
  <v-card class="mb-4 pt-4 mt-4">
    <v-card-text>
      Calculations date: {{ date }}
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
        </v-col>
        <v-col cols="12" v-if="status ==='failed' || status ==='accepted'">
          <v-progress-linear
            v-model="valueDeterminate"
            color="primary"
          ></v-progress-linear>
        </v-col>
        <v-col cols="12" v-if="status ==='successful'">
           <v-btn block color="primary" @click="dialog = true">Get results</v-btn>
          <bulletin-window
            v-if="dialog"
            :jobId="jobId"
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
      required: true
    },   
  },
  methods: {
    async getProcessStatus() {
      this.status = await getStatus(this.statusLink)
      this.jobId = this.statusLink.substring(this.statusLink.lastIndexOf('/') + 1);
      this.getStatusAttempt = this.getStatusAttempt + 1
    },
  },
  mounted() { 
    this.status = this.firstStatus
    if (this.status === "accepted") {
        this.getStatusAttempt = 1
      }
  },
  watch: {
    getStatusAttempt() {
     
      if (this.getStatusAttempt > 0 && this.getStatusAttempt < 100 ) {
        if (this.status === "accepted" || this.status === "running") {
          _.delay(()=> this.getProcessStatus(), 5000 )  
      }
      }

    }
  }

};
</script>
