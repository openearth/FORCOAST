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
          '00:00', '01:00', '02:00', '03:00',
          '04:00', '05:00', '06:00', '07:00',
          '08:00', '09:00', '10:00',
          '11:00', '12:00', '13:00', '14:00', '15:00',
          '16:00', '17:00', '18:00', '19:00', '20:00',
          '21:00', '22:00', '23:00',

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
      console.log(this.object.value)
      this.object = payload
      this.valueArray[0] = this.object.value
      console.log(this.object.value)
      this.setCalculationsHours(this.valueArray)
    },
  },  
  watch
  : {
    date() {
      console.log('date',this.date)
      this.setCalculationsTime(this.date);
    },
    selectHour() {
      console.log('selectHour',this.selectHour)
      this.setCalculationsHours(this.selectHour)
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