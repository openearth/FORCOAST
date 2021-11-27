<template>
  <div class="list-jobs">
    <v-list width="100%">
      <!-- <v-list-item v-for="job in jobs" :key="job.infos.jobID"  @click="dialog = true"> -->
      <v-list-item v-for="(job, i) in jobs" :key="i">
        <bulletin-window
          v-if="dialog"
          :jobId="job.infos.jobID"
          @close-dialog="dialog = false"
        ></bulletin-window>
        <v-list-item-icon>
         <v-icon small v-text="`mdi-checkbox-blank-circle`" :color="iconColor(job.infos.status)" @click="dialog = true"></v-icon>
       </v-list-item-icon>
       <v-list-item-content>
        <v-list-item-title v-text="job.infos.jobID"></v-list-item-title>
      </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import bulletinWindow from "@/components/bulletin-window";

const colors = {
  running: '#009688',
  failed: '#965300',
  accepted: '#009688',
  successful: '#4CAF50'
}

export default {
  components: {
    bulletinWindow
  },
  data () {
    return {
      jobs: [],
      jobId: "",
      dialog: false,
    }
  },
  mounted () {
    this.getJobs()
  },
  computed: {
    ...mapState({
      selectedService: (state) => state.selectedService
    }),
  },
  methods: {
    getJobs () {
      //console.log("selectedService")
      //console.log(selectedService)
      console.log("this.selectedService");
      console.log(this.selectedService);
      fetch(`https://wps.forcoast.apps.k.terrasigna.com/rest/processes/forcoast-sm-` + this.selectedService.id + `/jobs`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.jobs = data
        })
        .catch(error => {
          console.error('Error processes', error)
        })
    },
    iconColor (status) {
      return colors[status]
    }
  }
}
</script>

<style>
.list-jobs {
  overflow-y: auto;
  height:200px;
  width: 100%;
}
</style>
