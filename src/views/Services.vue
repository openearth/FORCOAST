<template>
  <div v-if="selectedService" class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">{{ selectedCategory }}</h2>
      <!-- <v-divider class="mt-4 mb-4" /> -->
    </div>
    <div>
      <service-viewer
        :service="selectedService"
        @active-legend-change="onActiveLegendChange"
        @show-draggable-marker="onShowDraggableMarker"
        @show-draw-polygon="onShowDrawPolygon"
      ></service-viewer>
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

export default {
  components: { serviceViewer },
  computed: {
    ...mapState({
      selectedCategory: (state) => state.selectedCategory,
      selectedService: (state) => state.selectedService,
    }),
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
  },
};
</script>
