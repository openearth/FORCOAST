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
  },
  data() {
    return {
      dialog: true,
      image: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
    };
  },
  mixins: [ clickaway ],
  template: '<p v-on-clickaway="away">Click away</p>',
  mounted() {
    var img = new Image();
    img.onload = function() {    
        const imgRatio = this.height / this.width
          console.log('this.height', this.height)
          console.log('this.width', this.width)
          console.log('this.imgRatio', imgRatio)
          if ( this.height > 600 ) {
          document.getElementById("bulletin-container").style.height = "600px"
          document.getElementById("bulletin-container").style.width = (600 / this.height) * this.width + "px"
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
