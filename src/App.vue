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
import buildWmsLayer from "@/lib/build-wms-layer";

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
    };
  },
  watch: {
    $route() {
      this.reset();
    },
    timeSelected() {
      // remove wms layer with this id and add it again.
      console.log("watch time changing this.layers", this.layers);
      this.layers = this.layers.map((layer) => ({
        ...layer,
        time: this.timeSelected,
      }));
      const wmslayers = this.layers.map(buildWmsLayer);
      this.$store.commit("REMOVE_WMS_LAYERS");
      this.$store.commit("ADD_WMS_LAYERS", wmslayers);
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
      console.log("event", event);
      // active layers
      this.layers = event;
      const wmslayers = this.layers.map(buildWmsLayer);
      this.$store.commit("FILTER_WMS_LAYERS", this.layers);
      this.$store.commit("ADD_WMS_LAYERS", wmslayers);
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
