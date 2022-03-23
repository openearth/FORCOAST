<template>
  <div v-if="selectedService" class="pa-4 home d-flex flex-column">
    <div>
      <!-- <h2 class="h2">{{ selectedCategory }}</h2> -->
      <!-- <v-divider class="mt-4 mb-4" /> -->
    </div>
    <div>
      <service-viewer
        :service="selectedService"
        @active-legend-change="onActiveLegendChange"
        @show-draggable-marker="onShowDraggableMarker"
        @show-draw-polygon="onShowDrawPolygon"
      ></service-viewer>
      <v-tour :steps="tourSteps" :options="tourConfig" name="introduction"></v-tour>
    </div>
  </div>
  <div v-else class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">{{ selectedCategory }}</h2>
      <v-divider class="mt-4 mb-4" />
      <p>Select a service from the dropdown list</p>
    </div>
  </div>
</template>
<script>

import { mapState } from "vuex";
import serviceViewer from "../components/service-viewer/service-viewer.vue";
import { tourConfig, tourSteps } from '@/plugins/vue-tour'
import * as Cookies from 'tiny-cookie'

export default {
  components: { serviceViewer },
  data: () => ({
    tourConfig,
    tourSteps
  }),
  mounted () {
    this.showTour()
  },
  computed: {
    ...mapState("layers", ["selectedCategory", "selectedService"]),
  },
  methods: {
    onActiveLayerChange(activelayers) {
      this.$emit("active-layers-change", activelayers);
    },
    onActiveLegendChange(legend) {
      this.$emit("active-legend-change", legend);
    },
    onShowDraggableMarker(event) {
      this.$emit("show-draggable-marker", event);
    },
    onShowDrawPolygon(event) {
      this.$emit("show-draw-polygon", event);
    },
    showTour () {
        this.$tours.introduction.start()
    }
  },
};
</script>
