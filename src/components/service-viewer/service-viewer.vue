<template>
  <div class="d-flex flex-column">
    <!-- <img v-img src="@/assets/Atunetan13-scaled.png"> -->
    <div>
      <!-- <h2 class="h2">TEST</h2> -->
      <div><b>Pilot area:</b> {{ selectedArea }}
      <p><b>Service module:</b> {{ service.name }}</p>
      <v-divider class="mt-4 mb-4" />
      </div>
      <p  data-v-step="3">{{ service.description }}</p>
      <p> For more information about this service, <a :href="service.service_webpage" target="_blank">click here</a></p>
      <v-divider class="mt-4 mb-4" />
      <p>An <b>example bulletin</b> produced by the service is available <a href="#" @click='exampleDialogTrue'>here</a> </p>
        <bulletin-window
              v-if="exampleDialog"
              :imageAdress="service.example"
              @close-dialog="exampleDialog = false"
        ></bulletin-window>
      <p>To <b>test the service</b> for a location of choice, follow the <a href="https://forcoast.eu/wp-content/uploads/2022/06/FORCOAST-User-Manual-Prototype-II.pdf" target="_blank">instructions</a> in the Service runner section below.</p>
      <p>We appreciate <b>your feedback</b> on the value of this service, please provide this <a v-bind:href="service.feedback" target="_blank">here</a>.</p>
      <!-- <p>If you are interested in a trial <a v-bind:href="'mailto:' + service.contact">e-mail us</a></p> -->
      <p>If you are interested to receive <b>daily bulletins</b> by instant messaging app as a free trial <a v-bind:href="'mailto:' + service.contact + '?cc=info@forcoast.eu&subject=Free%20trial%20' + service.name + '%20service&body=' + service.mail_body">e-mail us</a></p>
      <!-- https://css-tricks.com/snippets/html/mailto-links/ -->
    </div>
    <!-- .sync -->
    <collapsible-group
      :expand="1"
      :manual="false"
      title="Data viewer"
      data-v-step="4"
      bubble="Click here to display the data-layers that are related to the service module"
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
      <div v-if="checkLayer" >
         <v-btn disabled block color="primary">Graph Disabled</v-btn>
      </div>    
       <div v-else-if="(timeSpan.length && this.selectedLayer) || timeSpanUnfiltered.length <= 1500 && selectedLayer">  
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
      :bubble="SMinfo"
    >
    <draggable-marker v-if= service.components.draggable_marker
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
    v-if="service.components.hours"
    :expand="1"
    title = "Select a date and time for the calculations"
    > 
    <hour-selection></hour-selection>
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
      name="Select a preset"
      select="Select a species"
      @setPreset="setPreset">
      </presets>
      <entry-form-a4
      :presetValues="presetValues">
        
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
      <div v-if= 'RunRequirements' >
        <v-btn block color="primary"  @click="runTask">Run</v-btn>
      </div>
      <div v-else>
        <v-btn disabled block color="primary">Run</v-btn>
      </div>
    </div>
    <status-card 
      v-if="jobStatus==='accepted'"
      :date="calculationsTime"
      :hours ="calculationsHours"
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
import HourSelection from '@/components/hour-selection'
import BulletinWindow from '@/components/bulletin-window'
import { importConfig } from "@/lib/config-utils"


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
    HourSelection,
    BulletinWindow
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
      exampleDialog: false,
      presetValues: [],
    };
  },
  computed: {
    ...mapState("wps", ["markerLngLat", "calculationsTime", "calculationsHours", "selectedEntryValue", "selectedEntryValueOptional", "jobStatus", "statusLink", "serviceLimitsMarker", "polygon", "serviceLimitsBBox"]),
    ...mapState("layers", ["selectedTime", "timeSpan", "timeSpanUnfiltered", "selectedArea", "selectedService", "activeLayers"]),
    ...mapGetters("layers", ["selectedLayer", "timeExtent"]),
    SMinfo(){
      let SMinfo = importConfig(`content/sm-info/${this.selectedService.wps_id}-info.md`)
      SMinfo = SMinfo.replace('<p>','')
      SMinfo = SMinfo.replace('</p>','')
      return SMinfo
    },
    RunRequirements(){
      this.serviceLimitsMarker
      if (this.serviceLimitsMarker){

        this.calculationTime
        this.selectedEntryValue
        this.selectedEntryValueOptional
        if (this.service.wps_id == "a1" && this.calculationsTime && 
            this.valueRange(this.selectedEntryValue, 0, 2)) {
              return true

        } else if (this.service.wps_id == "a2" && this.calculationsTime && this.serviceLimitsBBox) {
              return true

        } else if (this.service.wps_id == "a3" && this.selectedEntryValue) {
              if (this.selectedEntryValue[0] && this.selectedEntryValue[1] && 
                  this.selectedEntryValue[2] && this.selectedEntryValue[3] &&
                  this.valueRange(this.selectedEntryValue[4], 8, 36) &&
                  this.valueRange(this.selectedEntryValue[5], 8, 36) &&
                  parseFloat(this.selectedEntryValue[4]) <= parseFloat(this.selectedEntryValue[5]) &&
                  this.valueRange(this.selectedEntryValue[6], 0, 10) &&
                  this.valueRange(this.selectedEntryValue[7], 10, 35) &&
                  parseFloat(this.selectedEntryValue[6]) <= parseFloat(this.selectedEntryValue[7]) &&
                  this.valueRange(this.selectedEntryValueOptional[0], 0, 10) &&
                  this.valueRange(this.selectedEntryValueOptional[1], 0, 10) &&
                  this.valueRange(this.selectedEntryValueOptional[2], 0, 2) &&
                  parseFloat(this.selectedEntryValueOptional[3])
                  ) {
                    return true
              } else {
                return false
              }
        } else if (this.service.wps_id == "a4" && this.selectedEntryValue) {
              if ((this.valueRange(this.selectedEntryValue[1], 0, 30) || this.selectedEntryValue[1] == 999) &&
                  (this.valueRange(this.selectedEntryValue[2], 0, 30) || this.selectedEntryValue[2] == 999) &&
                  (this.valueRange(this.selectedEntryValue[3], 0, 10000) || this.selectedEntryValue[3] == 999) &&
                  this.valueRange(this.selectedEntryValue[4], 0, 365) &&
                  this.valueRange(this.selectedEntryValue[5], 0, 365) && this.selectedEntryValue[4] <= this.selectedEntryValue[5] &&
                  this.valueRange(this.selectedEntryValue[6], 0, 365)) {
                 return true
              } else {
                return false
              }

        } else if (this.service.wps_id == "r1" && this.calculationsTime && this.calculationsHours &&
                   this.valueRange(this.selectedEntryValue, 0, 48) &&
                   Number.isInteger(parseFloat(this.selectedEntryValue))) {
              return true
        } else { 
              return false 
          }

    } else {
      return false
    }
  },
    checkLayer() {
      this.activeLayers       
      if (this.activeLayers[0] != undefined) {
        if (this.activeLayers[0].name === 'Frontal Zones Temperature' || this.activeLayers[0].name === 'Frontal Zones Chlorophyll' || this.activeLayers[0].name === 'Spawning Grounds for Oysters') {
          return true;
        }
          else {
            return false;
          }
        }
      else {
          return false ;
        }
      },
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
    },
    setPreset(value) {
      this.presetValues = value.slice()
    },
    valueRange(value, lower, upper){
      if (parseFloat(value) >= lower && parseFloat(value) <= upper){
        return true
      } else {
        return false
      }
    },
    exampleDialogTrue(){
      this.exampleDialog = true
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
