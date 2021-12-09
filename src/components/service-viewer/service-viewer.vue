<template>
  <div class="d-flex flex-column">
    <!-- <img v-img src="@/assets/Atunetan13-scaled.png"> -->
    <div>
      <!-- <h2 class="h2">TEST</h2> -->
      <div><b>Pilot area:</b> {{ selectedArea }}
      <p><b>Service module:</b> {{ service.name }}</p>
      </div>
      <p>{{ service.description }}</p>
      <v-divider class="mt-4 mb-4" />
    </div>
    <!-- .sync -->
    <collapsible-group
      :expand="1"
      :manual="false"
      title="Data viewer"
    >
    <collapsible-card
      v-if="service.components.layers"
      :expand="1"
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
      :expand="1"
    >
      <date-span :timeExtentISO="timeExtent"></date-span>
      <draggable-marker
        @show-draggable-marker="onShowDraggableMarker" 
    ></draggable-marker>
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
    </collapsible-group>
    <collapsible-group
      :expand="1"
      :manual="true"
      title="Service runner"
    >
    <draggable-marker
        @show-draggable-marker="onShowDraggableMarker" 
    ></draggable-marker>
    <collapsible-card
      v-if="service.components.date"
      :expand="1"
      title="Select a date for the calculations"
    >
      <single-date></single-date>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.entry_form"
      :title="service.components.entry_form.title"
      :nextButton="false"
      :expand="1"
    >
      <entry-form
        :value="service.components.entry_form.value"
        :entryType="service.components.entry_form.type"
      >
      </entry-form>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.telegram_form"
      :title="service.components.telegram_form.title"
      :nextButton="false"
      :expand="1"
    >
      <telegram-form
        :value="service.components.telegram_form.value"
        :entryType="service.components.telegram_form.type"
      >
      </telegram-form>
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
    <!-- TODO move it in a component -->
    <div v-if="service.components.run_task"  class="mb-4">
      <div v-if="calculationsTime">
        <v-btn block color="primary"  @click="runTask">Run</v-btn>
      </div>
      <div v-else>
        <v-btn disabled block color="primary">Run</v-btn>
      </div>
    </div>
    <status-card 
      v-if="jobStatus==='accepted'"
      :date="calculationsTime"
      :firstStatus="jobStatus"
      :statusLink="statusLink"
    ></status-card>
    <div v-if="service.components.joblist">
    <collapsible-card
      v-if="service.components.joblist"
      :expand="1"
      title="Overview of jobs"
    >
      <list-jobs :timeExtent="timeExtent"></list-jobs>
    </collapsible-card>
    </div>
    </collapsible-group>  
  </div>
</template>
<script>
import CollapsibleCard from "@/components/collapsible-card";
import CollapsibleGroup from "@/components/collapsible-group";
import LayersList from "@/components/layers-list";
import SingleDate from "@/components/single-date";
import DateSpan from "@/components/date-span";
import SelectableList from "@/components/selectable-list";
import DraggableMarker from "@/components/draggable-marker";
import DrawPolygon from "@/components/draw-polygon";
import TimeseriesGraph from "@/components/timeseries-graph";
import StatusCard from "@/components/status-card"
import ListJobs from '@/components/list-jobs'
import EntryForm from '@/components/entry-form'
import TelegramForm from '@/components/telegram-form'

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    CollapsibleCard,
    CollapsibleGroup,
    LayersList,
    SingleDate,
    DateSpan,
    DraggableMarker,
    DrawPolygon,
    SelectableList,
    TimeseriesGraph,
    StatusCard,
    ListJobs,
    EntryForm,
    TelegramForm
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
    ...mapState("wps", ["markerLngLat", "calculationsTime","jobStatus", "statusLink"]),
    ...mapState("layers", ["selectedTime", "timeSpan", "selectedArea"]),
    ...mapGetters("layers", ["selectedLayer", "timeExtent"])
  },
  methods: {
    ...mapActions("wps",["runProcessor", "clearJobStatus"]),
    ...mapActions("layers",["setActiveLayers", "clearSelectedTime", "getCapabilities", "clearCapabilities"]), 
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
      this.clearJobStatus();
      this.runProcessor();
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