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
      <mapbox-map
        v-if="acceptedLegal"
        :layers="layers"
        :legendLayer="legendLayer"
        :draggableMarker="draggableMarker"
        :drawPolygon="drawPolygon"
      />
    </v-main>
    <legal-dialog @accepted="onLegalAccepted" />
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import LegalDialog from "@/components/legal-dialog";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    MapboxMap: () => import("@/components/mapbox-map"),
    AppHeader,
    AppSidebar,
    LegalDialog,
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
    timeSelected() {
      const modifiedLayers = this.layers.map((layer) => ({
        ...layer,
        time: this.timeSelected,
      }));
      this.layers = modifiedLayers;
    },
  },
  computed: {
    ...mapState({
      timeSelected: (state) => state.timeSelected,
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
  },
};
</script>
