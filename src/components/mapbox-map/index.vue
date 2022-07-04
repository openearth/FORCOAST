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
    <!-- custom map components -->
    <map-control-baselayer :layers="mapBaseLayers" position="bottom-right" @basemapChange="basemapChange" />
    <v-mapbox-navigation-control position="bottom-right" />
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
     :valueLatTL="polygon == null ? 999 : latTL"
     :valueLngTL="polygon == null ? 999 : lngTL"
     :valueLatBR="polygon == null ? 999 : latBR"
     :valueLngBR="polygon == null ? 999 : lngBR"
     :polygonScoped="polygon"
     ></marker-coords>
     <scalebar/>
    <map-legend
      v-if="layer"
      :key="layer.id"
      :options="layer"
    />
    <basemap-toggle v-if="$root.map"
                     :basemap="basemap" />
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
import { mapActions } from "vuex";
import Scalebar from "./scalebar";
import center from "@turf/center";
import { points } from "@turf/helpers";
import BasemapToggle from "./basemap-toggle";

const config = getProjectConfig();

export default {
  components: {
    MapControlBaselayer,
    MapLayer,
    MapLegend,
    MapControlDraw,
    MapControlMarker,
    MarkerCoords,
    Scalebar,
    BasemapToggle
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
      basemap: "Satellite Map:"
    };
  },
  watch: {
    selectedService() {
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
    latTL() {
        const latMax = Math.max(
          this.polygon.features[0].geometry.coordinates[0][0][1],
          this.polygon.features[0].geometry.coordinates[0][1][1],
          this.polygon.features[0].geometry.coordinates[0][2][1],
          this.polygon.features[0].geometry.coordinates[0][3][1]
        )
        return latMax
    },
    lngTL() {
        const lngMin = Math.min(
          this.polygon.features[0].geometry.coordinates[0][0][0],
          this.polygon.features[0].geometry.coordinates[0][1][0],
          this.polygon.features[0].geometry.coordinates[0][2][0],
          this.polygon.features[0].geometry.coordinates[0][3][0]
        )
        return lngMin
    },
    latBR() {
        const latMin = Math.min(
          this.polygon.features[0].geometry.coordinates[0][0][1],
          this.polygon.features[0].geometry.coordinates[0][1][1],
          this.polygon.features[0].geometry.coordinates[0][2][1],
          this.polygon.features[0].geometry.coordinates[0][3][1]
        )
        return latMin
    },
    lngBR() {
        const lngMax = Math.max(
          this.polygon.features[0].geometry.coordinates[0][0][0],
          this.polygon.features[0].geometry.coordinates[0][1][0],
          this.polygon.features[0].geometry.coordinates[0][2][0],
          this.polygon.features[0].geometry.coordinates[0][3][0]
        )
        return lngMax
    },

    ...mapState("layers", ["selectedAreaBBox", "selectedService"]),
    ...mapState("wps", ["markerLngLat", "polygon"]),
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
    ...mapActions("wps", ["setMarkerCoordinates"]),
    calcCenterPoint() {
      const features = points(this.selectedAreaBBox);
      const cntr = center(features);
      this.centerPoint = cntr.geometry.coordinates;
      this.setMarkerCoordinates({lng:this.centerPoint[0], lat:this.centerPoint[1]})
    },
    basemapChange() {
      if (this.basemap == "Political Map:") {
        this.basemap = "Satellite Map:"
      }
      else {
        this.basemap = "Political Map:"
      }
    }
  },
};
</script>

<style>
.mapboxgl-map {
  height: 100%;
}
</style>
