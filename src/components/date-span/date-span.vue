<template>
  <div class="pa-4">
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
            :min="startDate"
            :max="endDate"
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
            :min="startDate"
            :max="endDate"
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
import createTimeSpan from "@/lib/create-time-span"; // NOTE. If the DescribeCoverage retrieves the timespan perhaps this can be removed.
//TODO when I will get the ok to proceed with time, I will use the full extent that the capabilities return so I will not need the createTimeSpan function

export default {
  data: () => ({
    startDate: "",
    endDate: "",
    menu: false,
    menu2: false,
    timeSpan: [],
  }),
  props: {
    timeExtent: {
      type: Array,
    },
  },

  watch: {
    startDate() {
      this.timeSpan.push(this.startDate);
    },
    endDate() {
      this.timeSpan.push(this.endDate);
    },
    timeExtent() {
      this.extractStartEndDate();
    },
    timeSpan() {
      if (this.timeSpan.length > 1) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        let days = createTimeSpan(start, end);

        days = days.map((day) => day.toISOString().substr(0, 10));
        this.$store.commit("SET_TIME_SPAN", days);
      }
    },
  },
  methods: {
    extractStartEndDate() {
      this.startDate = this.timeExtent[0]
        .replace("\r\n", "")
        .trim()
        .slice(0, 10);
      this.endDate = this.timeExtent[this.timeExtent.length - 1].slice(0, 10);
      console.log(
        "date-span component: start end date",
        this.startDate,
        this.endDate
      );
    },
  },
};
</script>