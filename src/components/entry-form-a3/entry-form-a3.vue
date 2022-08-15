<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>Enter a start date</v-subheader>
      </v-col>      
      <v-col cols="4">
        <dropdown class="my-dropdown-toggle"
                  :options="monthsArray"
                  :selected="object" 
                  v-on:updateOption="setMonthBegin" 
                  :placeholder="selectMonth"
                  :closeOnOutsideClick="true">
      </dropdown>
      </v-col>
      <v-col cols="4">
        <dropdown class="my-dropdown-toggle"
                  :options="yearsArray"
                  :selected="object" 
                  v-on:updateOption="setYearBegin" 
                  :placeholder="selectYear"
                  :closeOnOutsideClick="true">
        </dropdown>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Enter an end date</v-subheader>
      </v-col>      
      <v-col cols="4">
        <dropdown class="my-dropdown-toggle"
                  :options="monthsArray"
                  :selected="object" 
                  v-on:updateOption="setMonthEnd" 
                  :placeholder="selectMonth"
                  :closeOnOutsideClick="true">
        </dropdown>
      </v-col>
      <v-col cols="4">
        <dropdown class="my-dropdown-toggle"
                  :options="yearsArray"
                  :selected="object" 
                  v-on:updateOption="setYearEnd" 
                  :placeholder="selectYear"
                  :closeOnOutsideClick="true">
        </dropdown>
      </v-col>
    </v-row>
    <v-row 
        style="height:0px"
        v-if="valueArray[0]>valueArray[1] || 
              (valueArray[0]==valueArray[1] && valueArray[2]>valueArray[3])"
        >
        <v-subheader class="date-rules">End date must be the same or later than the start date</v-subheader>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Salinity thresholds</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[4]"
            label="Lower"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(8,36)]"
            v-on:input="entryValue"
            hint="g/kg"
            persistent-hint
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[5]"
            label="Upper"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(8,36),
                     rules.isHigher(this.valueArray[4],'lower threshold')]"
            v-on:input="entryValue"
            hint="g/kg"
            persistent-hint
          >
            <template v-slot:append>
              <v-tooltip
                bottom
                max-width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" small>
                    ℹ
                  </v-icon>
                </template>
                  These values represent the minimal and maximal threshold values for sea bottom salinity which are used to calculate scoring indexes.
              </v-tooltip>
            </template>
          </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Temperature thresholds </v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[6]"
            label="Lower"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(0,10)]"
            v-on:input="entryValue"
            hint="℃"
            persistent-hint
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[7]"
            label="Upper"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(10,35),
                     rules.isHigher(valueArray[6],'lower threshold')]"
            v-on:input="entryValue"
            hint="℃"
            persistent-hint
          >
             <template v-slot:append>
              <v-tooltip
                bottom
                max-width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" small>
                    ℹ
                  </v-icon>
                </template>
                  These values represent the minimal and maximal threshold values for sea bottom temperature which are used to calculate scoring indexes.
              </v-tooltip>
            </template>
          </v-text-field>
      </v-col>
    </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import dropdown from 'vue-dropdowns';
export default {
  data: () => ({
    valueArray: [],
    valueArrayOptional: ["0.75", "4.5", "0.5", "-4"],
    selectMonth: "Month",
    selectYear: "Year",
    monthsArray: [
                { "name": "January", "value": "1" },
                { "name": "February", "value": "2" },
                { "name": "March", "value": "3" },
                { "name": "April", "value": "4" },
                { "name": "May", "value": "5" },
                { "name": "June", "value": "6" },
                { "name": "July", "value": "7" },
                { "name": "August", "value": "8" },
                { "name": "September", "value": "9" },
                { "name": "October", "value": "10" },
                { "name": "November", "value": "11" },
                { "name": "December", "value": "12" },
    ],
    yearsArray: [
                { "name": "2009", "value": "2009" },
                { "name": "2010", "value": "2010" },
                { "name": "2011", "value": "2011" },
                { "name": "2012", "value": "2012" },
                { "name": "2013", "value": "2013" },
                { "name": "2014", "value": "2014" },
                { "name": "2015", "value": "2015" },
                { "name": "2016", "value": "2016" },
                { "name": "2017", "value": "2017" },
    ],
    object: {
      value: []
    },
    rules: {
      emptyField: entryValue => entryValue !== '' || 'Field is empty',
      isFloat: entryValue => Number.isFinite(parseFloat(entryValue)) == true ||'Must be a number',
      isInt: entryValue => Number.isInteger(parseFloat(entryValue)) == true ||'Must be a whole number',
      inRange(lower, upper) {
        return entryValue => entryValue >= lower && entryValue <= upper || `Must be in range ${lower} to ${upper}`
      },
      isHigher(lowerValue, msg) {
        return entryValue => entryValue >= parseFloat(lowerValue) || `Must be higher than ${msg}`
      }
    }
  }),
  components: {
    'dropdown': dropdown,
  },
  methods: { 
    ...mapActions("wps", ["setSelectedEntryValue", "setSelectedEntryValueOptional"]),
    ...mapState("wps", ["selectedEntryValueOptional"]),
    entryValue() {
      this.setSelectedEntryValue(this.valueArray)
      if (this.selectedEntryValueOptional() == null) {
        this.setSelectedEntryValueOptional(this.valueArrayOptional)
      }
    },
    setYearBegin(payload) {
      this.object = payload
      this.valueArray[0] = this.object.value
      this.setSelectedEntryValue(this.valueArray)
    },
    setYearEnd(payload) {
      this.object = payload
      this.valueArray[1] = this.object.value
      this.setSelectedEntryValue(this.valueArray)
    },
    setMonthBegin(payload) {
      this.object = payload
      this.valueArray[2] = this.object.value
      this.setSelectedEntryValue(this.valueArray)
    },
    setMonthEnd(payload) {
      this.object = payload
      this.valueArray[3] = this.object.value
      this.setSelectedEntryValue(this.valueArray)
    }
  }
};
</script>

<style scoped>
.my-dropdown-toggle {
  font-size: 16px;
  text-align: left;
}
::v-deep .dropdown-menu { 
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 100px;
  max-height: 200px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  overflow-y: scroll;
}
::v-deep .dropdown-toggle {
  color: #636b6f;
  min-width: 100px;
  padding: 10px 20px 10px 10px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 7px;
  border: 0;
  background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center calc(100% - 1px);
  background-color: transparent;
  transition: background 0s ease-out;
  float: none;
  box-shadow: none;
  border-radius: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
::v-deep .btn-group {
  min-width: 120px;
}
.date-rules {
  padding-left: 159px; 
  padding-bottom: 100px; 
  color: red;
  font-size: 13px;
  height: 1px;
}
</style>