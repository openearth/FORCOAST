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
    entryValue() {
      this.setSelectedEntryType(this.entryType);
      this.setSelectedEntryValue(this.entryValue); 
    }
  },
  methods: { 
    ...mapActions("wps", ["setSelectedEntryType", "setSelectedEntryValue"])
  }
};
</script>
