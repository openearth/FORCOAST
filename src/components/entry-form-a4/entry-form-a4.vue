<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>Number of days</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[0]"
            label="Days"
            :rules="[rules.emptyField,
                     rules.isInt]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Treshold temperature</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-row>
       <input @change="checkbox1" type="checkbox" v-model="checkoption1">
          <label>Temperature treshold</label> 
        </v-row>
        <v-row>
       <input @change="checkbox2" type="checkbox" v-model="checkoption2">
          <label>Cumalative temperature</label>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Treshold Temperature</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[2]"
            label="degrees celsius"
            :rules="[rules.emptyField,
                     rules.isInt]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Treshold of temperature for gonade development</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[3]"
            label="degrees celcius"
            :rules="[rules.emptyField,
                     rules.isFloat]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>   
    <v-row>
      <v-col cols="4">
        <v-subheader>Treshold of cumulative temperature</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[4]"
            label="degrees celcius"
            :rules="[rules.emptyField,
                     rules.isFloat]"
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
            v-model="valueArray[5]"
            label="Minimal"
            :rules="[rules.emptyField,
                     rules.isFloat]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[6]"
            label="Maximal"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.isHigher(valueArray[5],'minimal duration')]"
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
            v-model="valueArray[7]"
            label="days"
            :rules="[rules.emptyField,
                     rules.isInt]"
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

export default {
  data: () => ({
//    valueArray: this.SelectedEntryValue,
    //As string? or as numeric?, I did string for consistency
    valueArray: [],
    rules: {
      emptyField: entryValue => entryValue != '' || 'Field is empty',
      isFloat: entryValue => Number.isFinite(parseFloat(entryValue)) == true ||'Must be a number',
      isInt: entryValue => Number.isInteger(parseFloat(entryValue)) == true ||'Must be a whole number',
      inRange(lower, upper) {
        return entryValue => entryValue >= lower && entryValue <= upper || `Must be in range ${lower} to ${upper}`
      },
      isHigher(lowerValue, msg) {
        return entryValue => entryValue >= parseFloat(lowerValue) || `Must be higher than ${msg}`
      },
    },
    checkoption1: false,
    checkoption2: false
  }),
  computed: mapState("wps", ["selectedEntryValue"]),
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
    ...mapActions("wps", ["setSelectedEntryValue", "setSelectedEntryValueOptional"]),
    ...mapState("wps", ["selectedEntryValue", "selectedEntryValueOptional"]),
    checkbox1() {
      if (this.checkoption1 == true) {
        this.checkoption2 = false
        this.valueArray[1] = 0
        this.setSelectedEntryValue(this.valueArray)
        } else if (this.checkoption1 == false) {
        this.checkoption2 = true
        this.valueArray[1] = 1
        this.setSelectedEntryValue(this.valueArray)
      }
    },
    checkbox2() {
      if (this.checkoption2 == true) {
        this.checkoption1 = false
        this.valueArray[1] = 1
        this.setSelectedEntryValue(this.valueArray)
        } else if (this.checkoption2 == false) {
        this.checkoption1 = true
        this.valueArray[1] = 0
        this.setSelectedEntryValue(this.valueArray)
      }
    },
    entryValue() {
      this.setSelectedEntryValue(this.valueArray)
      if (this.selectedEntryValueOptional() == null) {
        this.setSelectedEntryValueOptional(this.valueArrayOptional)
      }
    },
  }
};
</script>
