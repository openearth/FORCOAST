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
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Oxygen lower treshold</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[1]"
            label="Default: 4.5"
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Resuspension treshold</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="valueArray[2]"
            label="Default: 0.5"
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
    // TODO: test whether this works
    valueArray: [0.75,4.5,0.5,-4],
  }),
  methods: { 
    ...mapActions("wps", ["setSelectedEntryValueOptional"]),
    // See https://jsfiddle.net/james2doyle/qjqrtsgq/ for reference
    entryValue() {
      // TODO: remote console.log messages once done with debugging
      console.log('a3-optional')
      console.log(this.valueArray)
      this.setSelectedEntryValueOptional(this.valueArray);
    }
    },
};
</script>
