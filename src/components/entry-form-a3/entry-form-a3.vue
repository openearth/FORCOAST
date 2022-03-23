<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value1 }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue1"
            label="Year"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value2 }}</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="entryValue2"
            label="Begin"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="entryValue2_2"
            label="End"
          ></v-text-field>
      </v-col>
    </v-row>
        <v-row>
      <v-col cols="4">
        <v-subheader>{{ value3 }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue3"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value4 }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue4"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value5 }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue5"
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
    entryValue1: "",
    entryValue2_2: "",
    entryValue2: "",
    entryValue3: "",
    entryValue4: "",
    entryValue5: "",
  }),
  props: {
    value1: {
      type: String, 
      required: true,
    },
    entryType1: {
      type: String, 
      required: true,
    },    
    value2: {
      type: String, 
      required: true,
    },
    entryType2: {
      type: String, 
      required: true,
    },
    value3: {
      type: String, 
      required: true,
    },
    entryType3: {
      type: String, 
      required: true,
    },
    value4: {
      type: String, 
      required: true,
    },
    entryType4: {
      type: String, 
      required: true,
    },
    value5: {
      type: String, 
      required: true,
    },
    entryType5: {
      type: String, 
      required: true,
    },
  },
  watch: {
    entryValue1() {
      this.setSelectedEntryType1(this.entryType1);
      this.setSelectedEntryValue1(this.entryValue1); 
    },
    entryValue2() {
      this.setSelectedEntryType2(this.entryType2);
      this.setSelectedEntryValue2(this.entryValue2); 
    },
    entryValue2_2() {
      this.setSelectedEntryType2_2(this.entryType2_2);
      this.setSelectedEntryValue2_2(this.entryValue2_2); 
    },
    entryValue3() {
      this.setSelectedEntryType3(this.entryType3);
      this.setSelectedEntryValue3(this.entryValue3); 
    },
    entryValue4() {
      this.setSelectedEntryType4(this.entryType4);
      this.setSelectedEntryValue4(this.entryValue4); 
    },
    entryValue5() {
      this.setSelectedEntryType5(this.entryType5);
      this.setSelectedEntryValue5(this.entryValue5); 
    }
  },
  methods: { 
    ...mapActions("wps", ["setSelectedEntryType1", "setSelectedEntryValue1"]),
    ...mapActions("wps", ["setSelectedEntryType2", "setSelectedEntryValue2"]),
    ...mapActions("wps", ["setSelectedEntryType2_2", "setSelectedEntryValue2_2"]),
    ...mapActions("wps", ["setSelectedEntryType3", "setSelectedEntryValue3"]),
    ...mapActions("wps", ["setSelectedEntryType4", "setSelectedEntryValue4"]),
    ...mapActions("wps", ["setSelectedEntryType5", "setSelectedEntryValue5"])
  }
};
</script>
