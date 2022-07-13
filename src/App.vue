<template>
  <v-app>
    <app-header />
    <app-sidebar
      @active-legend-change="onActiveLegendChange"
      @show-draggable-marker="onShowDraggableMarker"
    />
    <v-main>
      <!-- Reverse timeExtent to start with most recent date -->
      <layer-timestamp-card
        v-if="wmsLayer && timeExtent.length"
        :timeExtentISO="timeExtent"
        :originalTimeISO="layerTimestamp"
        class="layer-timestamp"
        @selected-time-change="onSelectedTimeChange"
      ></layer-timestamp-card>
      <mapbox-map
        v-if="acceptedLegal"
        :layer="wmsLayer"
        :draggableMarker="draggableMarker"
        :drawPolygonIcon="drawPolygonIcon"
      />
      <legal-dialog @accepted="onLegalAccepted" />
      <app-sidebar @toggle-tour="$tours.introduction.start()"/>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import LegalDialog from "@/components/legal-dialog";
import LayerTimestampCard from "@/components/layer-timestamp-card";
import { mapState, mapGetters, mapActions } from "vuex";

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
      draggableMarker: true,
      drawPolygonIcon: false
    };  
  },
  watch: {
    $route() {
      this.reset();
    },
    selectedService() {
      if (this.selectedService.components.polygon == true) {
        this.showPolygonIcon(true)
      } 
      else {
        this.showPolygonIcon(false)
      }
    }
  },
  computed: {
    ...mapState("layers", ["selectedTime", "selectedService"]),
    ...mapGetters("layers", ["wmsLayer", "timeExtent", "layerTimestamp"])
  },
  methods: {
    ...mapActions("layers",["setSelectedTime","clearActiveLayers"]),
    reset() {
      this.clearActiveLayers();
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
    onSelectedTimeChange(event) {
      this.setSelectedTime(event);
    },
    showPolygonIcon(boolean) {
      this.drawPolygonIcon = boolean
    }
  },
};
</script>
<style>
.layer-timestamp {
  margin-left: 10px;
  margin-top: 10px;
}
</style>