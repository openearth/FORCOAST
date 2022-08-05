<template>
  <div class="d-flex flex-column">
    <!-- <img v-img src="@/assets/Atunetan13-scaled.png"> -->
    <div>
      <!-- <h2 class="h2">TEST</h2> -->
      <div><b>Pilot area:</b> {{ selectedArea }}
      <p><b>Service module:</b> {{ service.name }}</p>
      </div>
      <p  data-v-step="3">{{ service.description }}</p>
      <p>An example bulletin produced by the service is available <a v-bind:href="service.example" target="_blank">here</a> </p>
      <p>To test the service for a location of choice, follow the instructions in the Service runner section below. We appreciate your feedback on the value of this service, please provide this <a v-bind:href="service.feedback" target="_blank">here</a>.</p>
      <v-divider class="mt-4 mb-4" />
      <!-- <p>If you are interested in a trial <a v-bind:href="'mailto:' + service.contact">e-mail us</a></p> -->
      <p>If you are interested to receive daily bulletins by instant messaging app as a free trial <a v-bind:href="'mailto:' + service.contact + '?cc=info@forcoast.eu&subject=Free%20trial%20' + service.name + '%20service&body=' + service.mail_body">e-mail us</a></p>
      <!-- https://css-tricks.com/snippets/html/mailto-links/ -->
    </div>
    <!-- .sync -->
    <collapsible-group
      :expand="1"
      :manual="false"
      title="Data viewer"
      data-v-step="4"
      bubble="Click here to visualise relevant parameters on the map"
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
      <collapsible-card
      v-if="service.components.layers_service_runner"
      :expand="1"
      title="Layers produced by service"
      >
    </collapsible-card>
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
          :timeSpanUnfiltered="timeSpanUnfiltered"
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
      :title="service.service_label"
      data-v-step="5"
      bubble="Click here to use the service"
    >
    <draggable-marker v-if= service.components.draggable_marker
        @show-draggable-marker="onShowDraggableMarker" 
    ></draggable-marker>
        <collapsible-card
      v-if="service.components.layers_service_runner"
      :expand="1"
      title="Select a layer for visualization"
    >
    </collapsible-card>  
    <collapsible-card
      v-if="service.components.date"
      :expand="1"
      title="Select a date for the calculations"
    >
      <single-date></single-date>
    </collapsible-card>
    <collapsible-card 
    v-if="service.components.time"
    :expand="1"
    title = "Select a date and time for the calculations"
    > 

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
        :entryRange="service.components.entry_form.range"
      >
      </entry-form>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.entry_form_a3"
      :title="service.components.entry_form_a3.title"
      :nextButton="false"
      :expand="1"
    >
      <entry-form-a3>
      </entry-form-a3>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.entry_form_a3_optional"
      :title="service.components.entry_form_a3_optional.title"
      :nextButton="false"
      :expand="1"
    >
      <entry-form-a3-optional>
      </entry-form-a3-optional>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.entry_form_a4"
      :title="service.components.entry_form_a4.title"
      :nextButton="false"
      :expand="1"
    >
      <presets
      :arrayOfobjects="service.components.presets"
      name="Select a preset">
      </presets>
      <entry-form-a4>
      </entry-form-a4>
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
      <div v-if= 'selectedEntryValue || calculationsTime' >
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
      :outputName="service.outputName"
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
import EntryFormA3 from '@/components/entry-form-a3'
import EntryFormA3Optional from '@/components/entry-form-a3-optional'
import EntryFormA4 from '@/components/entry-form-a4'
import Presets from '@/components/presets'


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
    EntryFormA3,
    EntryFormA3Optional,
    EntryFormA4,
    Presets,
    

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
      dialog: false
    };
  },

  computed: {
    ...mapState("wps", ["markerLngLat", "calculationsTime", "selectedEntryValue", "jobStatus", "statusLink"]),
    ...mapState("layers", ["selectedTime", "timeSpan", "timeSpanUnfiltered", "selectedArea"]),
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