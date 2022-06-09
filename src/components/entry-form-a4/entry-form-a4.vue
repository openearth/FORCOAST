<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>Method</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-row>
       <input @change="checkbox1(); entryValue()" type="checkbox" v-model="checkoption1">
          <label>Temperature threshold</label> 
        </v-row>
        <v-row>
       <input @change="checkbox2(); entryValue()" type="checkbox" v-model="checkoption2">
          <label>Cumulative temperature</label>
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
            label="degrees celsius"
            :rules="[rules.emptyField,
                     rules.isInt,
                     rules.inRange(0,30)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if= "checkoption2">
      <v-col cols="4">
        <v-subheader>Threshold of temperature for gonade development</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model.number="valueArray[2]"
            label="degrees celcius"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(0,30)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>   
    <v-row v-if= "checkoption2">
      <v-col cols="4">
        <v-subheader>Threshold of cumulative temperature</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model.number="valueArray[3]"
            label="degrees celcius"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(0,10000)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Pelagic larval duration</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model.number="valueArray[4]"
            label="Minimal"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(0,365)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model.number="valueArray[5]"
            label="Maximal"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.isHigher(valueArray[5],'minimal duration'),
                     rules.inRange(0,365)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Duration of spawning period</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model.number="valueArray[6]"
            label="days"
            :rules="[rules.emptyField,
                     rules.isInt,
                     rules.inRange(0,365)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapGetters} from "vuex";

export default {
  data: () => ({
//    valueArray: this.SelectedEntryValue,
    //As string? or as numeric?, I did string for consistency
    valueArray: [1,0],
    rules: {
      emptyField: entryValue => entryValue !== '' || 'Field is empty',
      isFloat: entryValue => Number.isFinite(parseFloat(entryValue)) == true ||'Must be a number',
      isInt: entryValue => Number.isInteger(parseFloat(entryValue)) == true ||'Must be a whole number',
      inRange(lower, upper) {
        return entryValue => entryValue >= lower && entryValue <= upper || `Must be in range ${lower} to ${upper}`
      },
      isHigher(lowerValue, msg) {
        return entryValue => entryValue >= parseFloat(lowerValue) || `Must be higher than ${msg}`
      },
    },
    checkoption1: true,
    checkoption2: false
  }),
  computed: {
    ...mapGetters("wps", {
      valuesFromStore: "getEntryValue"
    }),
    selectedEntryValue:{
      get(){
        return this.valuesFromStore
      },
      set(values){
        return values
      }
    }
  },
  watch: {
    selectedEntryValue(value) {
      this.valueArray = value
      if (value[1] == 0) {
        this.checkoption1 = true
        this.checkoption2 = false
        } else {
          this.checkoption1 = false
          this.checkoption2 = true
        }
      }
    },
  methods: { 
    ...mapActions("wps", ["setSelectedEntryValue", "setSelectedEntryValueOptional", "clearSelectedEntryValue"]),
    ...mapState("wps", ["selectedEntryValue", "selectedEntryValueOptional"]),
    checkbox1() {
      if (this.checkoption1 == true) {
        this.checkoption2 = false
        this.valueArray[0] = 0 
        } else if (this.checkoption1 == false) {
        this.checkoption2 = true
        this.valueArray[0] = 1
      }
    },
    checkbox2() {
      if (this.checkoption2 == true) {
        this.checkoption1 = false
        this.valueArray[0] = 1
        } else if (this.checkoption2 == false) {
        this.checkoption1 = true
        this.valueArray[0] = 0
      }
    },
    entryValue() {
      if  ( this.valueArray[0] !== undefined &&
          ((this.valueArray[1] >= 0 && this.valueArray[1] <= 30) ||
          ((this.valueArray[2] >= 0 && this.valueArray[2] <= 30) &&
           (this.valueArray[3] >= 0 && this.valueArray[3] <= 10000))) &&
           (this.valueArray[4] >= 0 && this.valueArray[4] <= 365) &&
           (this.valueArray[5] >= 0 && this.valueArray[5] <= 365) &&
           (this.valueArray[6] >= 0 && this.valueArray[6] <= 365)) { 
       this.setSelectedEntryValue(this.valueArray)
        if (this.selectedEntryValueOptional() == null) {
          this.setSelectedEntryValueOptional(this.valueArrayOptional)
        }
      }
    },
  }
};
</script>
