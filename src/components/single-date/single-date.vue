<template>
  <div class="pa-4">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Selected date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        >
        <template v-slot:append>
         <v-tooltip
           bottom
           >
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small>
                ℹ
            </v-icon>
          </template>
          Select the date that will be used for the start of the simulation
          </v-tooltip>
        </template>
        </v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        scrollable
        :min="getStartDate"
        :max="getEndDate"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    menu: false,
    date: "",
  }),
  watch: {
    date() {
      this.setCalculationsTime(this.date);
    },
  },
  computed: {
    getEndDate() {
      // Set endDate to today - 1 day (should be done based on available date)
      let date = new Date()
      date.setDate(date.getDate() -1);
      var endDate = new Date(date).toISOString().split('T')[0]
      // var endDate = "2022-06-01"
      return endDate
    },
    getStartDate() {
      // Set startDate to today - 7 days (should be done based on available date)
      let date = new Date()
      date.setDate(date.getDate() -7);
      var startDate = new Date(date).toISOString().split('T')[0]
      // var startDate = "2022-04-01"
      return startDate
    }
  },
  methods:{
    ...mapActions("wps", ["setCalculationsTime"])
  }
};
</script>
