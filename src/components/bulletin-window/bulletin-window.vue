<template>
  <div>
    <v-dialog v-model="dialog" width="unset">
      <v-card height="unset" width="unset">
        <div id="bulletin-container" ref="savecontent">
          <v-img :src="image"/>
        </div>
        <v-card-actions class="justify-center">       
          <v-btn color="primary" bottom text @click="closeDialog">
            Close
          </v-btn>    
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import featureInfo from "@/lib/featureInfo";

export default {
  // see https://www.smashingmagazine.com/2020/01/data-components-vue-js/
  props: {
    jobId: {
      type: String, 
      required: true,
    },   
  },
  data() {
    return {
      dialog: true,
      image: "https://wps.forcoast.apps.k.terrasigna.com/results/" + this.jobId + "-0/cwl-output/bulletin.png"
    };
  },
  mounted() {
    var img = new Image();
    img.onload = function() {
        if (this.height <= this.width) {
        const imgRatio = this.height / this.width
        console.log(imgRatio)
        document.getElementById("bulletin-container").style.width = "100%"
        document.getElementById("bulletin-container").style.height = imgRatio*100 + "%"
        }
        else {
        const imgRatio = this.width / this.height
        document.getElementById("bulletin-container").style.height = "65%"
        document.getElementById("bulletin-container").style.width = imgRatio*65 + "%"
        }
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
      this.dialog = false;
      this.$emit("close-dialog", false);
    },
    createGraph() {
      console.log("Graph!")
    }
  },
};
</script>
<style>
#bulletin-container {
  width: unset;
  height: unset;
}
</style>