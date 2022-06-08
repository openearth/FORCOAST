<template>
  <div class="layer-coords">
    <v-row
    style="padding-left: 20px; margin-top: -8px; width: 300px">
       <v-col 
       cols="3"
       style="width: 20px"
       >
      <v-text-field 
            v-model.number="lat"
            label="Lat"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(-90,90)]"
          ></v-text-field>
       </v-col>
           <v-col cols="3">
          <v-text-field
            v-model.number="lng"
            label="Lon"
            :rules="[rules.emptyField,
             rules.isFloat,
             rules.inRange(-180,180)]"
          ></v-text-field>
           </v-col>
           <v-btn 
           :disabled="!(lng >= -180 && lng <= 180 && lng !== '' &&
                        lat >= -90 && lat <= 90 && lat !== '' &&
                        ( lat != this.valueLat.toFixed(2) || lng != this.valueLat.toFixed(2) ) )"
           style="width: 10px; position: absolute; right: 30px; top: 17.5px"
           color="primary" 
           @click="setValue">
             Set
           </v-btn>
      </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      lat: this.valueLat.toFixed(2),
      lng: this.valueLat.toFixed(2),
      rules: {
      emptyField: entryValue => entryValue !== '' || 'Field is empty',
      isFloat: entryValue => Number.isFinite(parseFloat(entryValue)) == true ||'Must be a number',
      isInt: entryValue => Number.isInteger(parseFloat(entryValue)) == true ||'Must be a whole number',
      inRange(lower, upper) {
        return entryValue => entryValue >= lower && entryValue <= upper || `Must be in range ${lower} to ${upper}`
      },
      isHigher(lowerValue, msg) {
        return entryValue => entryValue >= parseFloat(lowerValue) || `Must be higher than ${msg}`
      },
      }
    };
  },
  props: {
    valueLat: {
      type: Number,
      required: true,
    },
    valueLng: {
      type: Number,
      required: true,
    },
  },
  watch: {
    valueLat(value) {
      this.lat = value.toFixed(2)
    },
    valueLng(value) {
      this.lng = value.toFixed(2)
    }
  },
  methods: { 
    ...mapActions("wps", ["setMarkerCoordinates"]),
    setValue() {
     this.setMarkerCoordinates({lat: parseFloat(this.lat), lng: parseFloat(this.lng)})
      
    }
  }
};
</script>

<style>
.layer-coords {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  height: 60px;
  width: 250px;

};
.font-style {
  height: 10%;
};
.button {
 color: blue;
 width: 50px;
 left: 80px
}
</style>
