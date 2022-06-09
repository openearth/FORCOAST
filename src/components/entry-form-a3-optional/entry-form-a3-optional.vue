<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>Half saturation constant of food</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[0]"
            label="Default: 0.75"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(0,10)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Oxygen lower threshold</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[1]"
            label="Default: 4.5"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(0,10)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Resuspension threshold</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[2]"
            label="Default: 0.5"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(0,2)]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Expected Decay</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[3]"
            label="Default: -4"
            :rules="[rules.emptyField,
                     rules.isFloat]"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    valueArray: [0.75,4.5,0.5,-4],
    rules: {
      emptyField: entryValue => entryValue !== '' || 'Field is empty',
      isFloat: entryValue => Number.isFinite(parseFloat(entryValue)) == true ||'Must be a number',
      inRange(lower, upper) {
        return entryValue => entryValue >= lower && entryValue <= upper || `Must be in range ${lower} to ${upper}`
      },
    }
  }),
  methods: { 
    ...mapActions("wps", ["setSelectedEntryValueOptional"]),
    // See https://jsfiddle.net/james2doyle/qjqrtsgq/ for reference
    entryValue() {
      this.setSelectedEntryValueOptional(this.valueArray);
    }
    },
};
</script>
