<template>
  <div class="d-flex flex-column">
    <div>
      <p>Service module: {{ service.name }}</p>
      <p>{{ service.description }} <a href="https://forcoast.eu/">here</a></p>
      <v-divider class="mt-4 mb-4" />
    </div>
    <!-- .sync -->
    <collapsible-card
      v-if="service.components.layers"
      :expand="0"
      title="Select a layer for visualization"
    >
      <layers-list
        :layers="service.components.layers"
        @active-layers-change="onActiveLayerChange"
        @active-legend-change="onActiveLegendChange"
      ></layers-list>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.date_span"
      title="Select start and end date for timeseries"
      :expand="0"
    >
      <date-span :timeExtent="timeExtent"></date-span>
    </collapsible-card>
    <div v-if="service.components.date_span" class="mb-4">
      <div v-if="timeSpan.length && selectedLayer">
        <v-btn block color="primary" @click="dialog = true">Create graph</v-btn>
        <timeseries-graph
          v-if="dialog"
          :lngLat="markerLngLat"
          :layer="selectedLayer"
          :timeSpan="timeSpan"
          @close-dialog="dialog = false"
        ></timeseries-graph>
      </div>
      <div v-else>
        <v-btn disabled block color="primary">Create graph</v-btn>
      </div>
    </div>
    <collapsible-card
      :title="service.components.draggable_marker.title"
      :nextButton="true"
      :expand="1"
    >
      <draggable-marker
        @show-draggable-marker="onShowDraggableMarker" 
      ></draggable-marker>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.entry_form"
      :title="service.components.entry_form.title"
      :nextButton="false"
      :expand="1"
    >
      <entry-form
        :value="service.components.entry_form.value"
      >
      </entry-form>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.draw_polygon"
      :title="service.components.draw_polygon.title"
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
      v-if="service.components.date"
      :expand="0"
      title="Select a date for the calculations"
    >
      <single-date :timeExtent="timeExtent"></single-date>
    </collapsible-card>
    <div v-if="service.components.run_task"  class="mb-4">
      <v-btn block color="primary"  @click="runTask">Run</v-btn>
    </div>
    <status-card 
      v-if="jobStatus==='accepted'"
      :date="selectedTime"
      :firstStatus="jobStatus"
      :statusLink="statusLink"
    ></status-card>
    <div v-if="service.components.joblist">
    <collapsible-card
      v-if="service.components.joblist"
      :expand="0"
      title="Overview of jobs"
    >
      <list-jobs :timeExtent="timeExtent"></list-jobs>
    </collapsible-card>
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
import StatusCard from "@/components/status-card"
import ListJobs from '@/components/ListJobs'
import EntryForm from '@/components/entry-form'

import { mapState, mapGetters, mapActions } from "vuex";



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
    StatusCard,
    ListJobs,
    EntryForm
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
      dialog: false,
    };
  },

  computed: {
    ...mapState(["markerLngLat", "jobStatus", "selectedTime", "statusLink", "timeSpan" ]),
    ...mapGetters(["selectedLayer", "timeExtent"])
  },
  methods: {
    ...mapActions(["runProcessor", "setActiveLayers", "clearSelectedTime", "getCapabilities", "clearCapabilities"]), // here that I clear the timeExtent I have to clear the capabilities instead
    onActiveLayerChange(layers) {
      
       
      this.clearCapabilities();
      this.clearSelectedTime(); 
      this.setActiveLayers(layers);
      this.getCapabilities();
  
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

    runTask() {
      this.$store.commit("CLEAR_JOB_STATUS");
      this.runProcessor()
    }
  },
};
</script>
<style>
.execute {
  position: fixed;
}
.v-btn:not(.v-btn--round).v-size--default {
    height: 25px;
    min-width: 64px;
    padding: 0 16px;
}
</style>