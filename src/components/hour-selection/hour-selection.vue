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
          label="Select date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
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
        <v-spacer></v-spacer>
        <v-row>
        <v-col cols="12">
          <v-select
            class="mySelect"
            :items="hoursArray"
            :selected="object" 
            :return-value.sync="selectHour"
            label="Select hour of the day"
            v-model="selectHour"
            prepend-icon="mdi-clock-outline"
            single-line
            hint="In Universal Time (UTC)"
            persistent-hint
            ></v-select>
        </v-col> 
       </v-row>     
   </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  data: () => ({
    valueArray: [],
    menu: false,
    date: "",
    selectHour: "",
    hoursArray: [
          '00:00 UTC', '01:00 UTC', '02:00 UTC', '03:00 UTC',
          '04:00 UTC', '05:00 UTC', '06:00 UTC', '07:00 UTC',
          '08:00 UTC', '09:00 UTC', '10:00 UTC',
          '11:00 UTC', '12:00 UTC', '13:00 UTC', '14:00 UTC', '15:00 UTC',
          '16:00 UTC', '17:00 UTC', '18:00 UTC', '19:00 UTC', '20:00 UTC',
          '21:00 UTC', '22:00 UTC', '23:00 UTC',

    ],
    object: {
      value: []
    },    
  }),
  components: {
 
  },
  methods: { 
    ...mapActions("wps", ["setCalculationsTime"]),
    ...mapActions("wps", ["setCalculationsHours"]),
    ...mapState("wps", ["calculationsHours"]),
    entryValue() {
      this.setCalculationsHours(this.valueArray)
    },
    setHours(payload) {
      this.object = payload
      this.setCalculationsHours(this.valueArray)
    },
  },  
  watch
  : {
    date() {
      this.setCalculationsTime(this.date);
    },
    selectHour() {
      this.setCalculationsHours(this.selectHour.substr(0,5))
    },
  },
  computed: {
    getEndDate() {
      // Set endDate to today (should be done based on available date)
      let date = new Date()
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
    }, 
  },
};
</script>

<style scoped>
.mySelect {
  font-size: 16px;
  text-align: center;
  max-width:220px; 
}

</style>