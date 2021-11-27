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
    <map-layer
      v-for="layer in wmsLayers"
      :key="layer.request"
      :options="layer"
    />
    <map-legend
      v-if="legendLayer"
      :base-url="legendLayerUrl"
      :legend-layer="legendLayer"
    />
    <!-- I have to
    ensure that wmsLayers have only one layer when this service is selected. -->
  </v-mapbox>
</template>

<script>
import { MAP_BASELAYERS, MAP_BASELAYER_DEFAULT } from "@/lib/constants";
import buildWmsLayer from "@/lib/build-wms-layer";
import { getProjectConfig } from "@/lib/config-utils";
import MapControlBaselayer from "./map-control-baselayer";
import MapControlDraw from "./map-control-draw";
import MapControlMarker from "./map-control-marker";
import MapLayer from "./map-layer";
import MapLegend from "./map-legend";
import { mapState } from "vuex";

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
  },
  props: {
    layers: {
      type: Array,
      default: () => [],
    },
    legendLayer: {
      type: String,
      default: null,
    },
    draggableMarker: {
      type: Boolean,
      default: false,
    },
    drawPolygon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      centerPoint: [0, 0],
    };
  },
  watch: {
    layers() {
      this.sortLayers();
    },
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
    wmsLayers() {
      return this.layers.map(buildWmsLayer);
    },
    legendLayerUrl() {
      const layer = this.layers.find((layer) => layer.id === this.legendLayer);

      if (layer) {
        return layer.url;
      }

      return "";
    },
    ...mapState({
      selectedAreaBBox: (state) => state.selectedAreaBBox,
    }),
  },
  methods: {
    onMapCreated(map) {
      this.$root.map = map;

      map.on("load", () => {
        this.$root.mapLoaded = true;
      });
    },
    // makes sure the layers are rendered in the order or the wmsLayers array
    // position 1 gets rendered on top, 2 below that etc.
    sortLayers() {
      const { map } = this.$root;

      // processing needs te be done in order, otherwise the internal layer order
      // of mapbox will be messed up
      this.layers.map(async (layer, index) => {
        const before = this.layers[index - 1] && this.layers[index - 1].id;

        // wait until layers are both loaded before proceeding
        await Promise.all(
          [layer.id, before].map(async (id) => {
            await this.layerLoaded(id);
          })
        );

        map.moveLayer(layer.id, before);
      });
    },
    // listens for when a layer is loaded by mapbox
    async layerLoaded(id) {
      const { map } = this.$root;

      if (!map.getLayer(id)) {
        // we need to wait for when a layer is loaded, hence the Promise
        await new Promise((resolve) => {
          this.cb = (e) => {
            // check if the loaded layer has the current id
            if (e.sourceDataType === "metadata" && e.sourceId === id) {
              resolve();
            }

            // remove callback since it will likely be re-added later
            map.off("sourcedata", this.cb);
          };

          // add callback when sourcedata is updated
          map.on("sourcedata", this.cb);
        });
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