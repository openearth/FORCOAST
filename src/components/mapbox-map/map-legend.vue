<template>
  <div class="layer-legend">
    <img :src="legendUrl" :class="resizeLegend" alt="legend" />
  </div>
</template>

<script>
import buildLegendUrl from "@/lib/build-legend-url";
import debounce from "lodash/debounce";
import { ref } from "vue";

export default {
  props: {
    styles: {//TODO @Daniel where is this used?
      type: String,
      default: "sst_36",
    },
    options:{
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      zoomLevel: 10,
      windowHeight: window.innerHeight
    };
  },

  computed: {
    legendUrl() {
      
      const scale = this.zoomLevel;
      return buildLegendUrl({
        ...this.options,
        ...{width:40, height:20},
        ...scale
      });
    },
    resizeLegend() {
      return this.windowHeight > 725 ? 'layer-legend_image' : 'layer-legend_image_small'
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    const map = this.$root.map;
    map.on("zoom", () => {
      this.setZoomLevel();
    });
  },
  methods: {
    setZoomLevel: debounce(function () {
      const map = this.$root.map;
      const zoom = map.getZoom();
      this.zoomLevel = zoom;
    }, 200),
    onResize() {
      this.windowHeight = window.innerHeight
      //return window.innerHeight > 725 ? 'layer-legend_image_small' : 'layer-legend_image_small'
    }
  },
};
</script>

<style>
.layer-legend {
  position: absolute;
  bottom: 5rem;
  left: 0.5rem;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.layer-legend_image {
  height: 100%;
  border-radius: 4px;
}
.layer-legend_image_small {
  height: 300px;
  border-radius: 4px;
}
</style>