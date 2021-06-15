<template>
  <v-card class="time-stamp pa-1">
    <v-card-title class="h4"> Date of the layer </v-card-title>
    <!-- rename timestemp to selectedTime because at my tool this is that I update -->
    <time-slider
      :dates="timeExtent"
      startAt="end"
      @update-timestep="updateSelectedTime"
    >
      <template v-slot:backButton="{ back }">
        <v-btn icon :disabled="getLoadingState" @click="back">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:label>
        <v-combobox
          id="timeslider-dropdown"
          v-model="selectedTime"
          :items="timeExtent"
          :disabled="loadingRasterLayers"
          label="Select a timestamp"
          flat
          item-text="date"
          item-value="date"
          return-object
          color="formBase"
        />
      </template>
      <template v-slot:forwardButton="{ forward }">
        <v-btn icon :disabled="getLoadingState" @click="forward">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
    </time-slider>
  </v-card>
</template>
<script>
import TimeSlider from "./time-slider";
export default {
  components: {
    TimeSlider,
  },
  props: {
    timeExtent: {
      type: Array,
      required: true,
    },
    originalTime: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(
      "original time mounted layer-timestamp-card.vue",
      this.originalTime,
      typeof this.originalTime
    );
  },
  data() {
    return {
      selectedTime: this.originalTime,
      getLoadingState: false,
      loadingRasterLayers: false,
    };
  },
  watch: {
    selectedTime() {
      console.log("selectedTime");
      this.$emit("selected-time-change", this.selectedTime);
    },
    originalTime() {
      this.selectedTime = this.originalTime;
      console.log("originalTime", this.originalTime);
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
  z-index: 1;
}
</style>