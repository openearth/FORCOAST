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
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import getStatus  from "@/lib/wps/getStatus"
const _ = require('lodash')

export default {
  data() { 
    return {
      status: "accepted",
      valueDeterminate: 0,
      getStatusAttempt: 0,
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
    }
  },
  methods: {
    ...mapActions(['']),
    async getProcessStatus() {
      this.status = await getStatus(this.statusLink)
      this.getStatusAttempt = this.getStatusAttempt + 1
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
     
      if (this.getStatusAttempt > 0 && this.getStatusAttempt < 15 ) {
        if (this.status === "accepted" || this.status === "running") {
          _.delay(()=> this.getProcessStatus(), 2000 )  
      }
      }

    }
  }

};
</script>