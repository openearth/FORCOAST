<template>
  <v-card class="time-stamp pa-1">
    <v-card-title class="h4"> Date of the layer </v-card-title>
    <v-row style="height:0px;">
      <v-subheader style="margin-top:-32px; margin-left:13px">Based on timezone of user device</v-subheader>
    </v-row>
    <time-slider
      :dates="timeExtent"
      :set-time-index="dateIndex"
      startAt="start"
      @update-timestep="updateSelectedTime"
    >
      <template v-slot:forwardButton="{ forward }">
        <v-btn icon :disabled="getLoadingState" @click="forward">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:label>
        <v-combobox
          id="timeslider-dropdown"
          v-model="selectedTime"
          :items="timeIdValueArray"
          :disabled="loadingRasterLayers"
          label="Select a timestamp"
          flat
          item-text="id"
          item-value="value"
          return-object
          color="formBase"
        />
      </template>
      <template v-slot:backButton="{ back }">
        <v-btn icon :disabled="getLoadingState" @click="back">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
    </time-slider>
  </v-card>
</template>
<script>
import TimeSlider from "./time-slider";
import isoToYyyyMmDdHhMm from "../../lib/formatTime/iso-to-yyyy-mm-dd-hh-mm";
import isoToYyyyMmDd from "../../lib/formatTime/iso-to-yyyy-mm-dd";
import isoToYyyyMm from "../../lib/formatTime/iso-to-yyyy-mm";

export default {
  components: {
    TimeSlider,
  },
  props: {
    timeExtentISO: {
      type: Array,
      default: ()=> [],
      required: true,
    },
    originalTimeISO: {
      type: String,
      default: null,
      required: true,
    },
    interval: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedTime: null,
      getLoadingState: false,
      loadingRasterLayers: false,
      dateIndex: 0,
      timeExtentReverse: this.timeExtentISO.slice().reverse(),
      timeIdValueArray: []
    };
  },
  computed: { 
    timeExtent() {
      return this.timeIdValueArray
    }
  },
  mounted() {
    if (this.interval == "hourly") {
      this.timeIdValueArray = this.timeExtentReverse.map(timeISO => ({value : timeISO, id : isoToYyyyMmDdHhMm(timeISO)}))
    }
    else if (this.interval == "daily") {
      this.timeIdValueArray = this.timeExtentReverse.map(timeISO => ({value : timeISO, id : isoToYyyyMmDd(timeISO)}))
    }
    else if (this.interval == "monthly") {
      this.timeIdValueArray = this.timeExtentReverse.map(timeISO => ({value : timeISO, id : isoToYyyyMm(timeISO)}))
    }
    else {
    this.timeIdValueArray = this.timeExtentReverse.map(timeISO => ({value : timeISO, id : isoToYyyyMmDdHhMm(timeISO)}))
    }
    this.selectedTime = this.timeIdValueArray[0]
  },
  watch: {
    selectedTime() {
      this.$emit("selected-time-change", this.selectedTime.value);
      this.dateIndex =  this.timeExtent.indexOf(this.selectedTime)
    },
  },
  methods: {
    updateSelectedTime(event) {
      this.selectedTime = event;
    },
  },
};
</script>
<style scoped>
.time-stamp {
  position: absolute;
  top: calc(var(--spacing-default));
  left: calc(56px + var(--spacing-default));
  max-width: 20rem;
  margin-right: calc(var(--spacing-default));
  z-index: 2;
}
</style>