<template>
  <v-form>
    <v-container>
    <v-row>
      <v-col cols="4">
        <v-subheader>{{ value }}</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-text-field
            v-model="entryValue"
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
    entryValue: "",
  }),
  props: {
    value: {
      type: String, 
      required: true,
    },
    entryType: {
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
