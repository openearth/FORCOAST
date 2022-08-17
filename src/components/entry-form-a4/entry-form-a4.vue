<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>Method</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-row>
       <input type="checkbox" v-model="checkoption1">
          <label>Temperature threshold
            <v-tooltip
                bottom
                max-width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on"
                  small
                  right
                  style="padding-left:70px">
                    ℹ
                  </v-icon>
                </template>
                  This method determines spawning events based on daily average water temperature. The threshold value should be a daily average in which spawning events start to occur.
              </v-tooltip>
          </label> 
        </v-row>
        <v-row>
       <input type="checkbox" v-model="checkoption2">
          <label>Cumulative temperature
            <v-tooltip
                bottom
                max-width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on"
                  small
                  right
                  style="padding-left:61px">
                    ℹ
                  </v-icon>
                </template>
                  This method determines spawning events based on comulative daily averae water temperatures. Temperature values start accumulating from the 1st of Januari each year. The threshold value should be a cumulative temperature in which spawning events start to occur.
              </v-tooltip>
          </label>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if= "checkoption1">
      <v-col cols="4">
        <v-subheader>Threshold Temperature</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model.number="valueArray[1]"
            :rules="[rules.isInt,
                     rules.inRange(0,30)]"
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
                This value is used to determine the threshold for when spawning events will occur.
              </v-tooltip>
            </template>
          </v-text-field>
      </v-col>
    </v-row>
    <v-row v-if= "checkoption2">
      <v-col cols="4">
        <v-subheader>Threshold of temperature for gonade development</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model.number="valueArray[2]"
            :rules="[rules.isFloat,
                     rules.inRange(0,30)]"
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
                 A value of “gonad development threshold” represents the cumulative temerature above which gonad maturation begins.
              </v-tooltip>
            </template>
          </v-text-field>
      </v-col>
    </v-row>   
    <v-row v-if= "checkoption2">
      <v-col cols="4">
        <v-subheader>Threshold of cumulative temperature</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model.number="valueArray[3]"
            :rules="[rules.isFloat,
                     rules.inRange(0,10000)]"
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
                Cumulative sum of temperature above "Threshold of temperature for gonad development" represent the gonad maturation process. When the sum exceeds this thresolds, spawning events begins. 
              </v-tooltip>
            </template>
          </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Pelagic larval duration</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model.number="valueArray[4]"
            label="Min"
            :rules="[rules.isFloat,
                     rules.inRange(0,365)]"
            v-on:input="entryValue"
            hint="days"
            persistent-hint
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model.number="valueArray[5]"
            label="Max"
            :rules="[rules.isFloat,
                     rules.isHigher(valueArray[5],'minimal duration'),
                     rules.inRange(0,365)]"
            v-on:input="entryValue"
            hint="days"
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
                This value is the duration in which larvae will drift prior to settlement abilities. For species which are swarming, the swarming duration should be added to pelagic larval duration parameterization.
              </v-tooltip>
            </template>
          </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Duration of spawning period</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model.number="valueArray[6]"
            :rules="[rules.isInt,
                     rules.inRange(0,365)]"
            v-on:input="entryValue"
            hint="days"
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
                  This value represents the duration of a spawning event for the species of interest.
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

export default {
  props: {
    presetValues: {
      type: Array,
      required: false,
    },
  },
  data: () => ({
    valueArray: [0],
    rules: {
      isFloat: entryValue => (Number.isFinite(parseFloat(entryValue)) == true || 
               entryValue == "" || entryValue == undefined) ||'Must be a number',
      isInt: entryValue => (Number.isInteger(parseFloat(entryValue)) == true || 
             entryValue == "" || entryValue == undefined) ||'Must be a whole number',
      inRange(lower, upper) {
        return entryValue => ((entryValue >= lower && entryValue <= upper) || 
               entryValue == "" || entryValue == undefined) || `Must be in range ${lower} to ${upper}`
      },
      isHigher(lowerValue, msg) {
        return entryValue => (entryValue >= parseFloat(lowerValue) || entryValue == "" || 
               entryValue == undefined) || `Must be higher than ${msg}`
      },
    },
    checkoption1: true,
    checkoption2: false
  }),
  computed: {
    ...mapState("wps", ["selectedEntryValue"]),
  },
  watch: {
    checkoption1(value) {
      if (value) {
        this.checkoption2 = false
        this.valueArray[0] = 0
        this.valueArray[2] = ""
        this.valueArray[3] = ""
        this.setSelectedEntryValue(this.valueArray)
      } else {
        this.checkoption2 = true
        this.valueArray[0] = 1
        this.valueArray[1] = ""
        this.setSelectedEntryValue(this.valueArray)
        }
      },
    checkoption2(value) {
      if (value) {
        this.checkoption1 = false
        this.valueArray[0] = 1
        this.valueArray[2] = ""
        this.valueArray[3] = ""
        this.setSelectedEntryValue(this.valueArray)
      } else {
        this.checkoption1 = true
        this.valueArray[0] = 0
        this.valueArray[1] = ""
        this.setSelectedEntryValue(this.valueArray)
        }
      },
      presetValues(){
        this.valueArray = this.presetValues
      }
    },
  methods: { 
    ...mapActions("wps", ["setSelectedEntryValue"]),
    entryValue() {
      if (this.valueArray[0] == 0) {
        let TempValueArray = this.valueArray.slice()
        TempValueArray[2] = 999 
        TempValueArray[3] = 999
        this.setSelectedEntryValue(TempValueArray)
      }  
      else if (this.valueArray[0] == 1) {
        let TempValueArray = this.valueArray.slice()
        TempValueArray[1] = 999
        this.setSelectedEntryValue(TempValueArray)
      }
      else{ 
        this.setSelectedEntryValues(this.valueArray)
      }
    }
  }
};
</script>
