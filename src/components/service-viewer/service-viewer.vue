<template>
  <div class="d-flex flex-column">
    <div>
      <!-- <h2 class="h2">TEST</h2> -->
      <p>Service module: {{ service.name }}</p>
      <p>{{ service.description }} <a href="https://forcoast.eu/">here</a></p>
      <v-divider class="mt-4 mb-4" />
    </div>
    <!-- .sync -->
    <draggable-marker
      v-if="service.components.draggable_marker"
      @show-draggable-marker="onShowDraggableMarker"
    ></draggable-marker>
    <collapsible-card
      v-if="service.components.draw_polygon"
      :title="service.components.draw_polygon.title"
      :polygon="polygon"
      :nextButton="true"
      :expand="1"
    >
      <draw-polygon
        :text="service.components.draw_polygon.text"
        @show-draw-polygon="onShowDrawPolygon"
      ></draw-polygon>
    </collapsible-card>
    <div v-if="service.components.selectable_lists">
      <collapsible-card
        v-for="list in service.components.selectable_lists"
        :key="list"
        :title="list.title"
        :nextButton="true"
        :disabled="true"
        :expand="1"
      >
        <selectable-list :values="list.values"></selectable-list>
      </collapsible-card>
    </div>
    <collapsible-card
      v-if="service.components.layers"
      :expand="0"
      title="Select a layer"
    >
      <layers-list
        :layers="service.components.layers"
        @active-layers-change="onActiveLayerChange"
        @active-legend-change="onActiveLegendChange"
      ></layers-list>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.date_span"
      title="Select start and end date"
      :expand="0"
    >
      <date-span :timeExtent="timeExtent"></date-span>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.date"
      :expand="0"
      title="Select a date"
    >
      <single-date></single-date>
    </collapsible-card>
    <!-- It cant be general -->
    <div v-if="service.components.date_span">
      <div v-if="timeSpan.length && activeLayer">
        <v-btn block color="primary" @click="dialog = true">Create graph</v-btn>
        <timeseries-graph
          v-if="dialog"
          :lngLat="markerLngLat"
          :layer="activeLayer"
          :timeSpan="timeSpan"
          @close-dialog="dialog = false"
        ></timeseries-graph>
      </div>
      <div v-else>
        <v-btn disabled block color="primary">Create graph</v-btn>
      </div>
    </div>
    <div v-if="service.components.run_task">
      <v-btn disabled block color="primary">Run</v-btn>
    </div>
  </div>
</template>
<script>
import CollapsibleCard from "@/components/collapsible-card";
import LayersList from "@/components/layers-list";
import SingleDate from "@/components/single-date";
import DateSpan from "@/components/date-span";
import SelectableList from "@/components/selectable-list";
import DraggableMarker from "@/components/draggable-marker";
import DrawPolygon from "@/components/draw-polygon";
import TimeseriesGraph from "@/components/timeseries-graph";
import { mapState } from "vuex";

import getWMSCapabilities from "@/lib/getWmsCapabilities";

export default {
  components: {
    CollapsibleCard,
    LayersList,
    SingleDate,
    DateSpan,
    DraggableMarker,
    DrawPolygon,
    SelectableList,
    TimeseriesGraph,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: "Select a layer",
      activeLayer: null,
      dialog: false,
    };
  },
  watch: {
    activeLayer() {
      this.getActiveLayerTimeExtent();
    },
  },
  computed: {
    ...mapState({
      markerLngLat: (state) => state.markerLngLat,
      timeExtent: (state) => state.timeExtent,
      timeSpan: (state) => state.timeSpan,
    }),
  },
  methods: {
    onActiveLayerChange(activelayers) {
      //NOTE temporal solution. activeLayer is used only for the GetFeatureInfo request.
      // In later stage I might need to implement a getFeatureInfo for every open layer.
      // it is not clarified yet.
      this.activeLayer = activelayers[0];
      this.$emit("active-layers-change", activelayers);
    },
    onActiveLegendChange(legend) {
      this.$emit("active-legend-change", legend);
    },
    onShowDraggableMarker(event) {
      console.log("service-viewer component: onShowDraggableMarker", event);
      this.$emit("show-draggable-marker", event);
    },
    onShowDrawPolygon(event) {
      this.$emit("show-draw-polygon", event);
    },
    // rename to getLayerExtend?
    async getCapabilities() {
      // its a getcapabilities
      try {
        const response = await getWMSCapabilities({
          //TODO rename it If I see that it is working
          url: this.activeLayer.url,
        });
        const capabilities = response.WMT_MS_Capabilities.Capability;
        return capabilities;
      } catch (error) {
        console.log("error:", error);
      }
    },
    async getActiveLayerTimeExtent() {
      const capabilities = await this.getCapabilities();
      const allLayers = capabilities.Layer.Layer;
      const layer = allLayers.find(
        (layer) => layer.Name._text === this.activeLayer.id
      );

      const extent = layer.Extent[0]._text.split(",");

      this.$store.commit("SET_TIME_EXTENT", extent);
    },
  },
};
</script>
<style>
.execute {
  position: fixed;
}
</style>