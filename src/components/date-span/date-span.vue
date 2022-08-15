<template>
  <div class="pa-4"> 
    <div class="px-5 pb-3 flex-grow-1 overflow-y-auto">
      This tool can create a line-chart for the values of a data-layer in a specific location over time. <br/><br/>
      <div style="font-weight:bold;">To create a timeseries graph:</div>
      -Select a data-layer <br/> 
      -Select a start- and end-date<br/> 
      -Select a location with the blue marker
    </div>
    <v-row>
      <v-col>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="startDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startDate"
              label="Start date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <!-- min max should not be hardcoded any more -->
          <v-date-picker
            v-model="startDate"
            no-title
            scrollable
            :min="min"
            :max="max"
            :allowed-dates="allowedDates"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(startDate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :return-value.sync="endDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endDate"
              label="End date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <!-- min max should not be hardcoded anymore but equal to a parameter -->
          <v-date-picker
            v-model="endDate"
            no-title
            scrollable
            :min="min"
            :max="max"
            :allowed-dates="allowedDates"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(endDate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import createTimeSpan from "@/lib/create-time-span";
import filterExtentYyyyMmDdUnique from "@/lib/formatTime/filter-extent-yyyy-mm-dd-unique";
import { mapState, mapActions } from "vuex";
// NOTE. If the DescribeCoverage retrieves the timespan perhaps this can be removed.
//TODO when I will get the ok to proceed with time, I will use the full extent that the capabilities return so I will not need the createTimeSpan function

export default {
  data: () => ({
    startDate: "",
    endDate: "",
    menu: false,
    menu2: false,
    timeSpan: [],
    min: "",
    max: "",
  }),
  props: {
    timeExtentISO: {
      type: Array,
    },
  },
  computed: { 
    ...mapState("layers", ["selectedService", "activeLayers"]),
    timeExtent() {
      return filterExtentYyyyMmDdUnique(this.timeExtentISO)
    }
  },
  mounted() { 
    this.initValues()
  },
  watch: {
    startDate() {
      this.timeSpan.push(this.startDate);
    },
    endDate() {
      this.timeSpan.push(this.endDate);
    },
    timeExtent() {
      this.startDate = this.timeExtent[0];
      this.min = this.startDate;
      this.endDate = this.timeExtent[this.timeExtent.length - 1];
      this.max = this.endDate;
    },
    timeSpan() {
      if (this.startDate != undefined && this.endDate != undefined) {
        const startDateString = this.startDate.replaceAll('-','')
        const endDateString = this.endDate.replaceAll('-','')
        if (startDateString < endDateString) {
          if (this.timeSpan.length > 1 && this.startDate !== undefined && this.endDate !== undefined) {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            let days = createTimeSpan(start, end, this.activeLayers[0].interval);
            if (this.activeLayers[0].interval == "hourly") {
              days = days.map((day) => day.toISOString());
              days.forEach((hour, index) => {
                if (this.timeExtentISO.find(value => value.includes(hour.substr(0, 13)))){
                  const match = this.timeExtentISO.find(value => value.includes(hour.substr(0, 13)))
                  days[index] = match
                }
              });
            } else {
              days = days.map((day) => day.toISOString().substr(0, 10));
            }
            
          const actualTimes = this.timeExtentISO.filter(value => days.includes((value.substr(0,13))))
          const filteredDays = days.filter(day => this.timeExtent.includes(day))
          this.setTimeSpan(filteredDays);
          if (this.selectedService.name == "Site Prospection") {
          this.setTimeSpanUnfiltered(filteredDays)
          }
          else {
          this.setTimeSpanUnfiltered(days) 
          }
        }
      } else {
        this.setTimeSpan([])
        this.setTimeSpanUnfiltered([])
       }
      }
    },
  },
  methods: {
    ...mapActions("layers", ["setTimeSpan", "setTimeSpanUnfiltered"]),
       allowedDates (val) {
        if (this.timeExtent.length && this.timeExtent.indexOf(val) !== -1) {
          return true
        } else {
          return false
        }
      },
      initValues() {
        this.startDate = this.timeExtent[0];
        this.min = this.startDate;
        this.endDate = this.timeExtent[this.timeExtent.length - 1];
        this.max = this.endDate;
      }
  }
};
</script>