<template>
  <div>
    <v-dialog v-model="dialog" width="800">
      <v-card height="600" width="800">
        <div id="graph-container" ref="savecontent">
          <v-img :src="image"/>
        </div>
        <v-card-actions class="justify-center">       
          <v-btn color="primary" bottom text @click="printDialog">
            Print
          </v-btn>
          <v-btn color="primary" bottom text @click="saveDialog">
            Save
          </v-btn>
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
import VueHtmlToPaper from 'vue-html-to-paper';
import html2canvas from 'html2canvas';

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
  watch: {
    featuresInfo() {
      // https://vuetifyjs.com/en/api/v-img/
      this.createGraph();
    },
  },
  methods: {
    // https://techformist.com/save-div-image-vue/
    async saveDialog() {
      const el = this.$refs.savecontent;
      console.log("el")
      console.log(this.$refs)
      const options = {
        type: "dataURL",
      };
      const printCanvas = await html2canvas(el, options);
      const link = document.createElement("a");
      console.log("printCanvas")
      console.log(printCanvas)
      link.setAttribute("download", "download.png");
      link.setAttribute(
        "href",
        printCanvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    },
    closeDialog() {
      this.dialog = false;
      this.$emit("close-dialog", false);
    },
    createGraph() {
      console.log("Graph!")
    },
    printDialog() {
      // https://stackoverflow.com/questions/52343006/how-to-print-a-part-of-a-vue-component-without-losing-the-style
      this.$htmlToPaper('graph-container');
    }
  },
};
</script>
<style>
#graph-container {
  width: 800px;
  height: 500px;
}
</style>