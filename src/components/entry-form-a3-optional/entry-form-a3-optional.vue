<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value_8 }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue_8"
            label="Default: 0.75"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value_9 }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue_9"
            label="Default: 4.5"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value_10 }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue_10"
            label="Default: 0.5"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value_11 }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue_11"
            label="Default: -4"
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
    entryValue_8: "",
    entryValue_9: "",
    entryValue_10: "",
    entryValue_11: ""
  }),
  props: {
    value_8: {
      type: String, 
      required: true,
    },
    entryType_8: {
      type: String, 
      required: true,
    },
    value_9: {
      type: String, 
      required: true,
    },
    entryType_9: {
      type: String, 
      required: true,
    },      
    value_10: {
      type: String, 
      required: true,
    },
    entryType_10: {
      type: String, 
      required: true,
    },    
    value_11: {
      type: String, 
      required: true,
    },
    entryType_11: {
      type: String, 
      required: true,
    },
  },
  watch: {
    entryValue_8() {
      this.setSelectedEntryTypeOptional([this.entryType_8, this.entryType_9, this.entryType_10, this.entryType_11]);
      this.setSelectedEntryValueOptional([this.entryValue_8, this.entryValue_9, this.entryValue_10, this.entryValue_11]);
    },
    entryValue_9() {
      this.setSelectedEntryTypeOptional([this.entryType_8, this.entryType_9, this.entryType_10, this.entryType_11]);
      this.setSelectedEntryValueOptional([this.entryValue_8, this.entryValue_9, this.entryValue_10, this.entryValue_11]);
    },
    entryValue_10() {
      this.setSelectedEntryTypeOptional([this.entryType_8, this.entryType_9, this.entryType_10, this.entryType_11]);
      this.setSelectedEntryValueOptional([this.entryValue_8, this.entryValue_9, this.entryValue_10, this.entryValue_11]);
    },
    entryValue_11() {
      this.setSelectedEntryTypeOptional([this.entryType_8, this.entryType_9, this.entryType_10, this.entryType_11]);
      this.setSelectedEntryValueOptional([this.entryValue_8, this.entryValue_9, this.entryValue_10, this.entryValue_11]);
    }
  },
  methods: { 
    ...mapActions("wps", ["setSelectedEntryTypeOptional", "setSelectedEntryValueOptional"])
  }
};
</script>
