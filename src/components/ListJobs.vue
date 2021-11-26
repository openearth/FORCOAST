<template>
  <div class="list-jobs">
    <v-list width="100%">
      <v-list-item v-for="job in jobs" :key="job.infos.jobID"  :to="`/editor/${job.infos.jobID}`">
        <v-list-item-icon>
         <v-icon small v-text="`mdi-checkbox-blank-circle`" :color="iconColor(job.infos.status)"></v-icon>
       </v-list-item-icon>
       <v-list-item-content>
        <v-list-item-title v-text="job.infos.jobID"></v-list-item-title>
      </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
const colors = {
  running: '#009688',
  failed: '#965300',
  accepted: '#009688',
  successful: '#4CAF50'
}

export default {
  data () {
    return {
      jobs: []
    }
  },
  mounted () {
    this.getJobs()
  },
  methods: {
    getJobs () {
      fetch(`https://wps.forcoast.apps.k.terrasigna.com/rest/processes/forcoast-sm-a2/jobs`, {
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
