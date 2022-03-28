<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value_1 }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue_1"
            label="Year"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value_2 }}</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="entryValue_2"
            label="Begin"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="entryValue_3"
            label="End"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value_4 }}</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="entryValue_4"
            label="Lower"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="entryValue_5"
            label="Upper"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value_6 }}</v-subheader>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="entryValue_6"
            label="Lower"
          ></v-text-field>
      </v-col>
      <v-col cols="4">
          <v-text-field
            v-model="entryValue_7"
            label="Upper"
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
    entryValue_1: "",
    entryValue_2: "",
    entryValue_3: "",
    entryValue_4: "",
    entryValue_5: "",
    entryValue_6: "",
    entryValue_7: ""
  }),
  props: {
    value_1: {
      type: String, 
      required: true,
    },
    entryType_1: {
      type: String, 
      required: true,
    },
    value_2: {
      type: String, 
      required: true,
    },
    entryType_2: {
      type: String, 
      required: true,
    },      
    entryType_3: {
      type: String, 
      required: true,
    },    
    value_4: {
      type: String, 
      required: true,
    },
    entryType_4: {
      type: String, 
      required: true,
    },
    entryType_5: {
      type: String, 
      required: true,
    },      
    value_6: {
      type: String, 
      required: true,
    },
    entryType_6: {
      type: String, 
      required: true,
    }, 
    entryType_7: {
      type: String, 
      required: true,
    },       
  },
  watch: {
    entryValue_1() {
      this.setSelectedEntryType([this.entryType_1, this.entryType_2, this.entryType_3, this.entryType_4, this.entryType_5, this.entryType_6, this.entryType_7]);
      this.setSelectedEntryValue([this.entryValue_1, this.entryValue_2, this.entryValue_3, this.entryValue_4, this.entryValue_5, this.entryValue_6, this.entryValue_7]);
    },
    entryValue_2() {
      this.setSelectedEntryType([this.entryType_1, this.entryType_2, this.entryType_3, this.entryType_4, this.entryType_5, this.entryType_6, this.entryType_7]);
      this.setSelectedEntryValue([this.entryValue_1, this.entryValue_2, this.entryValue_3, this.entryValue_4, this.entryValue_5, this.entryValue_6, this.entryValue_7]);
    },
    entryValue_3() {
      this.setSelectedEntryType([this.entryType_1, this.entryType_2, this.entryType_3, this.entryType_4, this.entryType_5, this.entryType_6, this.entryType_7]);
      this.setSelectedEntryValue([this.entryValue_1, this.entryValue_2, this.entryValue_3, this.entryValue_4, this.entryValue_5, this.entryValue_6, this.entryValue_7]);
    },
    entryValue_4() {
      this.setSelectedEntryType([this.entryType_1, this.entryType_2, this.entryType_3, this.entryType_4, this.entryType_5, this.entryType_6, this.entryType_7]);
      this.setSelectedEntryValue([this.entryValue_1, this.entryValue_2, this.entryValue_3, this.entryValue_4, this.entryValue_5, this.entryValue_6, this.entryValue_7]);
    },
    entryValue_5() {
      this.setSelectedEntryType([this.entryType_1, this.entryType_2, this.entryType_3, this.entryType_4, this.entryType_5, this.entryType_6, this.entryType_7]);
      this.setSelectedEntryValue([this.entryValue_1, this.entryValue_2, this.entryValue_3, this.entryValue_4, this.entryValue_5, this.entryValue_6, this.entryValue_7]);
    },
    entryValue_6() {
      this.setSelectedEntryType([this.entryType_1, this.entryType_2, this.entryType_3, this.entryType_4, this.entryType_5, this.entryType_6, this.entryType_7]);
      this.setSelectedEntryValue([this.entryValue_1, this.entryValue_2, this.entryValue_3, this.entryValue_4, this.entryValue_5, this.entryValue_6, this.entryValue_7]);
    },
    entryValue_7() {
      this.setSelectedEntryType([this.entryType_1, this.entryType_2, this.entryType_3, this.entryType_4, this.entryType_5, this.entryType_6, this.entryType_7]);
      this.setSelectedEntryValue([this.entryValue_1, this.entryValue_2, this.entryValue_3, this.entryValue_4, this.entryValue_5, this.entryValue_6, this.entryValue_7]);
    }
  },
  methods: { 
    ...mapActions("wps", ["setSelectedEntryType", "setSelectedEntryValue"])
  }
};
</script>
