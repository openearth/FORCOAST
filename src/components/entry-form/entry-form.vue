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
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(entryRange[0],entryRange[1])]"
          >
            <template v-slot:append>
              <v-tooltip
                bottom
              >
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" small>
                    ℹ
                </v-icon>
              </template>
              {{ information }}
              </v-tooltip>
            </template>
          </v-text-field>
      </v-col>
    </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    entryValue: "",
    rules: {
      emptyField: entryValue => entryValue != '' || 'Field is empty',
      isFloat: entryValue => Number.isFinite(parseFloat(entryValue)) == true ||'Must be a number',
      inRange(lower, upper) {
        return entryValue => entryValue >= lower && entryValue <= upper || `Must be in range ${lower} to ${upper}`
      },
    }
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
    entryRange: {
      type: Array, 
      required: true,
    },    
  },
  computed: {
    ...mapState("layers", ["selectedService"]),
    information(){
      if (this.selectedService.wps_id == "r1"){
      return "This value will determine the duration of the backtracking simulation."
    } else if (this.selectedService.wps_id == "a1"){
      return "This value will be used to display additional information in the output bulletin regarding the selected limit value."
    } else {
      return ""
    }
    }
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
