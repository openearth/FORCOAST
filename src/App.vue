<template>
  <v-app>
    <app-header />
    <app-sidebar
      @active-legend-change="onActiveLegendChange"
      @show-draggable-marker="onShowDraggableMarker"
      @show-draw-polygon="onShowDrawPolygon"
    />
    <v-main>
      <layer-timestamp-card
        v-if="activeLayers && timeExtent.length"
        :timeExtent="timeExtent"
        :originalTime="selectedTime"
        @selected-time-change="onSelectedTimeChange"
      ></layer-timestamp-card>
      <mapbox-map
        v-if="acceptedLegal"
        :layers="activeLayers"
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
import { mapGetters, mapState } from "vuex";

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
  },
  computed: {
    ...mapState({
      selectedTime: (state) => state.selectedTime,
      timeExtent: (state) => state.timeExtent,
    }),
    ...mapGetters(['activeLayers'])
  },
  methods: {
    reset() {
      this.$store.commit("CLEAR_ACTIVE_LAYERS")
      this.legendLayer = "";
    },
    onLegalAccepted() {
      this.acceptedLegal = true;
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
