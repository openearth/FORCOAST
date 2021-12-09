<template>
  <div class="list-jobs">
    <v-list width="100%">
      <!-- <v-list-item v-for="job in jobs" :key="job.infos.jobID"  @click="dialog = true"> -->
      <v-list-item v-for="(job, i) in jobs" :key="i">
        <v-list-item-icon>
         <v-icon small v-text="`mdi-checkbox-blank-circle`" :color="iconColor(job.infos.status)" @click="menuActionClick(job)"></v-icon>
       </v-list-item-icon>
       <v-list-item-content>
        <v-list-item-title v-text="job.infos.jobID"></v-list-item-title>
      </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- <bulletin-window
      v-if="dialog"
      :jobId="job.infos.jobID"
      @close-dialog="dialog = false"
    ></bulletin-window> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
//import bulletinWindow from "@/components/bulletin-window";

const colors = {
  running: '#009688',
  failed: '#965300',
  accepted: '#009688',
  successful: '#4CAF50'
}

export default {
  //components: {
  //  bulletinWindow
  //},
  data () {
    return {
      jobs: [],
      jobId: "",
      dialog: false,
      //joblist: [],
      //statuslist: [],
    }
  },
  mounted () {
    this.getJobs()
  },
  computed: {
    ...mapState("layers", ["selectedService"] ),
  },
  methods: {
    menuActionClick(input) {
      console.log(input.infos.jobID)
      const image = "https://wps.forcoast.apps.k.terrasigna.com/results/" + input.infos.jobID + "-0/cwl-output/bulletin.png"
      console.log(image)
      window.open(image);

    },
    getJobs () {
      fetch(`https://wps.forcoast.apps.k.terrasigna.com/rest/processes/forcoast-sm-` + this.selectedService.wps_id + `/jobs`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.jobs = data
          //console.log("this.jobs")
          //console.log(this.jobs)
          //var joblist = []
          //var statuslist = []
          //console.log(joblist)
          //var ii = 0          
          const res = data
          //console.log("test")
          for (const job in res){   
            //joblist[ii] = res[job].infos.jobID
            //statuslist[ii] = res[job].infos.status
            //console.log(ii)
            //console.log(joblist[ii])
            //console.log(statuslist[ii])
            // Only add new jobs is ID is unique
            //if (ii != 0 && joblist[ii] != joblist[ii-1]) {
            //  ii = ii + 1
            //}
            //if (ii == 0) {
            //  ii = ii + 1
            //}
            console.log(`${job} : ${res[job].infos.jobID}`)
          }
          //console.log(joblist)
          //console.log(statuslist)
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