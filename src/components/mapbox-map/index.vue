<template>
  <v-mapbox
    :access-token="accessToken"
    :map-style="mapConfig.style"
    :center="mapConfig.center"
    :zoom="mapConfig.zoom"
    :min-zoom="3"
    @mb-created="onMapCreated"
    id="map"
    ref="map"
  >
    <v-mapbox-navigation-control position="bottom-right" />
    <!-- custom map components -->
    <map-control-baselayer :layers="mapBaseLayers" position="bottom-right" />
    <map-control-marker
      v-if="draggableMarker"
      :center="centerPoint"
    ></map-control-marker>
    <map-control-draw v-if="drawPolygon"></map-control-draw>
    <!-- TODO change to layers in the future -->
    <map-layer
      v-if="layer"
      :key="layer.request"
      :options="layer"
    />
    <marker-coords
     v-if="markerLngLat"
     :valueLat="markerLngLat.lat"
     :valueLng="markerLngLat.lng"
     ></marker-coords>
    <map-legend
      v-if="layer"
      :key="layer.id"
      :options="layer"
    />
   
  </v-mapbox>
</template>

<script>
import { MAP_BASELAYERS, MAP_BASELAYER_DEFAULT } from "@/lib/constants";

import { getProjectConfig } from "@/lib/config-utils";
import MapControlBaselayer from "./map-control-baselayer";
import MapControlDraw from "./map-control-draw";
import MapControlMarker from "./map-control-marker";
import MapLayer from "./map-layer";
import MapLegend from "./map-legend";
import { mapState } from "vuex";
import MarkerCoords from "./marker-coords";

import center from "@turf/center";
import { points } from "@turf/helpers";

const config = getProjectConfig();

export default {
  components: {
    MapControlBaselayer,
    MapLayer,
    MapLegend,
    MapControlDraw,
    MapControlMarker,
    MarkerCoords
  },
  props: {
    /* TODO change to layers if we want to show more than one layers on the same time */
    layer: {
      type: Object,
      default: () => {},
    },
    draggableMarker: {
      type: Boolean,
      default: true,
    },
    drawPolygon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      centerPoint: [0, 0],
    };
  },
  watch: {
    selectedAreaBBox() {
      if (this.selectedAreaBBox.length) {
        this.zoomToExtend();
        this.calcCenterPoint();
      }
    },
  },
  computed: {
    accessToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN;
    },
    mapConfig() {
      return {
        center: config.map.center,
        zoom: config.map.zoom,
        style: 'mapbox://styles/forcoast/ckv2hfj623qkb14l9akxfvyzu'
      };
    },
    mapBaseLayers() {
      return MAP_BASELAYERS;
    },

    ...mapState("layers", ["selectedAreaBBox"]),
    ...mapState("wps", ["markerLngLat"])
  },
  methods: {
    onMapCreated(map) {
      this.$root.map = map;

      map.on("load", () => {
        this.$root.mapLoaded = true;
      });
      
      // immediately zoom to extent if entering route with area activated
      if (this.selectedAreaBBox !== null) {
        this.zoomToExtend();
      }
    },

    zoomToExtend() {
      const { map } = this.$root;
      map.fitBounds(this.selectedAreaBBox);
    },
    calcCenterPoint() {
      const features = points(this.selectedAreaBBox);
      const cntr = center(features);
      this.centerPoint = cntr.geometry.coordinates;
    },
  },
};
</script>

<style>
.mapboxgl-map {
  height: 100%;
}
</style>