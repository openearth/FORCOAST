<template>
  <div>
    <v-dialog v-model="dialog" width="unset">
      <v-card height="unset" width="unset">
        <div id="bulletin-container" ref="savecontent" v-on-clickaway="closeDialog">
          <v-img :src="image"/>
        </div>
        <v-card-actions class="justify-center">       
          <v-btn color="primary" 
                 bottom 
                 text 
                 @click="closeDialog"
                 class="closeButton">
            Close
          </v-btn>    
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import featureInfo from "@/lib/featureInfo";
import { mixin as clickaway } from 'vue-clickaway';

export default {
  // see https://www.smashingmagazine.com/2020/01/data-components-vue-js/
  props: {
    jobId: {
      type: String, 
      required: true,
    },
    outputName: {
      type: String,
      required: false
    },   
  },
  data() {
    return {
      dialog: true,
      image: "https://wps.forcoast.apps.k.terrasigna.com/results/" + this.jobId + "-0/cwl-output/" + this.outputName
    };
  },
  mixins: [ clickaway ],
  template: '<p v-on-clickaway="away">Click away</p>',
  mounted() {
    var img = new Image();
    img.onload = function() {    
          const monitorHeight = window.innerHeight
          console.log('OUTPUTNAME', this.outputName)
          if ( this.height > monitorHeight ) {
          document.getElementById("bulletin-container").style.height = monitorHeight - 150 + "px"
          document.getElementById("bulletin-container").style.width = ( (monitorHeight -150) / this.height) * this.width + "px"
          }
          const monitorWidth = window.innerWidth
          if ( this.width > monitorWidth &&  this.width > 2*this.height ) {
          document.getElementById("bulletin-container").style.width = monitorWidth - 150 + "px"
          document.getElementById("bulletin-container").style.height = ( (monitorWidth -150) / this.width) * this.height + "px"
          }
          this.height = 0
          this.width = 0
    };
    img.src = this.image;   
  },
  watch: {
    featuresInfo() {
      // https://vuetifyjs.com/en/api/v-img/
      this.createGraph();
    },
  },
  methods: {
    closeDialog() {
      console.log('OUTPUTNAME', this.outputName)
      this.dialog = false;
      this.$emit("close-dialog", false);
    },
    createGraph() {
      console.log("Graph!")
    },
  },
};
</script>
<style scoped>
#bulletin-container {
  width: unset;
  height: unset;
  margin-left: 10px;
  margin-right: 10px;
}
.closeButton {
  font-size: 20px;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>
