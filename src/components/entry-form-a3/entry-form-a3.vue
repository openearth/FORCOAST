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
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[2]"
            label="End"
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
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[4]"
            label="Upper"
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
            v-on:input="entryValue"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="valueArray[6]"
            label="Upper"
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
    valueArrayOptional: ["0.75", "4.5", "0.5", "-4"]
  }),
  methods: { 
    ...mapActions("wps", ["setSelectedEntryValue", "setSelectedEntryValueOptional"]),
    ...mapState("wps", ["selectedEntryValueOptional"]),
    entryValue() {
      console.log(this.valueArray)
      this.setSelectedEntryValue(this.valueArray)
      if (this.selectedEntryValueOptional() == null) {
        this.setSelectedEntryValueOptional(this.valueArrayOptional)
      }
    },
  }
};
</script>
