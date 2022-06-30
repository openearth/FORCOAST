<template>
  <div>
    <v-dialog v-model="dialog" width="unset">
      <v-card height="unset" width="unset">
        <div id="monitoring-container" v-on-clickaway="closeDialog">
          <v-img :src="imageTHREDDS"/>
          <v-img :src="imageGeoserver"/>
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
  data() {
    return {
      dialog: true,
      imageTHREDDS: "https://minio.apps.k.terrasigna.com/forcoast/monitoring_bulletins/FORCOAST_monitoring.png",
      imageGeoserver: "https://minio.apps.k.terrasigna.com/forcoast/monitoring_bulletins/FORCOAST_geoserver_monitoring.png"
    };
  },
  mixins: [ clickaway ],
  template: '<p v-on-clickaway="away">Click away</p>',
  mounted() {
    var img = new Image();
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
    },
  },
};
</script>
<style scoped>
#monitoring-container {
  width: unset;
  height: unset;
  margin-left: auto;
  margin-right: auto;
}
.closeButton {
  font-size: 20px;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>
