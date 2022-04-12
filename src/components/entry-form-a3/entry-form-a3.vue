<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>Enter a year</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[0]"
            label="Year"
            :rules="[rules.emptyField,
                     rules.isInt,
                     rules.inRange(2004,2017)]"
                      
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Enter months</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[1]"
            label="Begin"
            :rules="[rules.emptyField,
                     rules.isInt,
                     rules.inRange(1,12)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[2]"
            label="End"
            :rules="[rules.emptyField,
                     rules.isInt,
                     rules.inRange(1,12),
                     rules.isHigher(valueArray[1],'begin month')]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Salinity tresholds</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[3]"
            label="Lower"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(8,36)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[4]"
            label="Upper"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(8,36),
                     rules.isHigher(this.valueArray[3],'lower treshold')]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Temperature tresholds</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[5]"
            label="Lower"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(0,10)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[6]"
            label="Upper"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(10,35),
                     rules.isHigher(valueArray[5],'lower treshold')]"
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
    valueArray: [],
    //As string? or as numeric?, I did string for consistency
    valueArrayOptional: ["0.75", "4.5", "0.5", "-4"],
    rules: {
      emptyField: entryValue => entryValue != '' || 'Field is empty',
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
  methods: { 
    ...mapActions("wps", ["setSelectedEntryValue", "setSelectedEntryValueOptional"]),
    ...mapState("wps", ["selectedEntryValueOptional"]),
    entryValue() {
      this.setSelectedEntryValue(this.valueArray)
      if (this.selectedEntryValueOptional() == null) {
        this.setSelectedEntryValueOptional(this.valueArrayOptional)
      }
    },
  }
};
</script>
