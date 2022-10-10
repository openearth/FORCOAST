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
            :rules="[rules.isFloat,
                     rules.inRange(0,10)]"
            v-on:input="entryValue"
            hint="mg/m³ (Chl)"
            persistent-hint
          >
            <template v-slot:append>
              <v-tooltip
                bottom
                max-width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" small>
                    ℹ
                  </v-icon>
                </template>
                  This value represents the half-saturation coefficient of the food response based on the known physiology of the species.
              </v-tooltip>
            </template>
          </v-text-field>
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
            :rules="[rules.isFloat,
                     rules.inRange(0,10)]"
            v-on:input="entryValue"
            hint="mg/L"
            persistent-hint
          >
           <template v-slot:append>
              <v-tooltip
                bottom
                max-width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" small>
                    ℹ
                  </v-icon>
                </template>
                  This value represents the oxygen content on the bottom. Different species have different sensitivity to hypoxia. The value should be based on the species of interest.
              </v-tooltip>
            </template>
          </v-text-field>
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
            :rules="[rules.isFloat,
                     rules.inRange(0,2)]"
            v-on:input="entryValue"
            hint="g/m²/d (POM)" 
            persistent-hint
            >
            <template v-slot:append>
              <v-tooltip
                bottom
                max-width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" small>
                    ℹ
                  </v-icon>
                </template>
                  This value represents resuspension of sediments. The user can define a critical threshold for bottom resuspension from where the oysters are negatively affected.
              </v-tooltip>
            </template>
          </v-text-field>
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
            :rules="[rules.isFloat]"
            v-on:input="entryValue"
          >
            <template v-slot:append>
              <v-tooltip
                bottom
                max-width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" small>
                    ℹ
                  </v-icon>
                </template>
                  This value represents the coefficient of expected decay.
              </v-tooltip>
            </template>
          </v-text-field>
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
      isFloat: entryValue => (Number.isFinite(parseFloat(entryValue)) == true || 
               entryValue == "" || entryValue == undefined) ||'Must be a number',
      inRange(lower, upper) {
        return entryValue => ((entryValue >= lower && entryValue <= upper) || 
               entryValue == "" || entryValue == undefined) || `Must be in range ${lower} to ${upper}`
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
