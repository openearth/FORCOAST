<template>
  <v-app>
    <app-header />
    <app-sidebar
      @active-layers-change="onActiveLayersUpdate"
      @active-legend-change="onActiveLegendChange"
      @show-draggable-marker="onShowDraggableMarker"
      @show-draw-polygon="onShowDrawPolygon"
    />
    <v-main>
      <layer-timestamp-card
        v-if="layers.length && timeExtent.length"
        :timeExtent="timeExtent"
        :originalTime="selectedTime"
        @selected-time-change="onSelectedTimeChange"
      ></layer-timestamp-card>
      <mapbox-map
        v-if="acceptedLegal"
        :layers="layers"
        :legendLayer="legendLayer"
        :draggableMarker="draggableMarker"
        :drawPolygon="drawPolygon"
      />
      <legal-dialog @accepted="onLegalAccepted" />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import LegalDialog from "@/components/legal-dialog";
import LayerTimestampCard from "@/components/layer-timestamp-card";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    MapboxMap: () => import("@/components/mapbox-map"),
    AppHeader,
    AppSidebar,
    LegalDialog,
    LayerTimestampCard,
  },
  data() {
    return {
      layers: [],
      legendLayer: null,
      acceptedLegal: false,
      draggableMarker: false,
      drawPolygon: false,
      boxPlot: false,
    };
  },
  watch: {
    $route() {
      this.reset();
    },
    selectedTime() {
      const modifiedLayers = this.layers.map((layer) => ({
        ...layer,
        time: this.selectedTime,
      }));
      this.layers = modifiedLayers;
    },
  },
  computed: {
    ...mapState({
      selectedTime: (state) => state.selectedTime,
      timeExtent: (state) => state.timeExtent,
    }),
  },
  methods: {
    reset() {
      this.layers = [];
      this.legendLayer = "";
    },
    onLegalAccepted() {
      this.acceptedLegal = true;
    },
    onActiveLayersUpdate(event) {
      // active layers
      this.layers = event;
    },
    onActiveLegendChange(event) {
      this.legendLayer = event;
    },
    onShowDraggableMarker(event) {
      this.draggableMarker = event;
    },
    onShowDrawPolygon(event) {
      this.drawPolygon = event;
    },
    onSelectedTimeChange(event) {
      this.$store.commit("SET_SELECTED_TIME", event);
    },
  },
};
</script>
