<template>
  <div :class="bboxEnabled">
    <v-row style="padding-left:13px; height:30px; margin-top:-7px">
      <v-subheader style="font-size:18px;
                       font-weight:bold;
                       color:black;"
                       >Set Area of Interest:</v-subheader>
    </v-row>
    <v-row style="padding-left:13px; height:30px">
      <v-subheader style="font-size:18px;
                          font-weight:bold;
                          color:black"
                          >Delete Area of Interest:</v-subheader>
    </v-row>
    <h3>________________________________</h3>
    <div v-if="latTL != 999">
      <v-row style="height:35px; padding-left:13px">
         <v-subheader style="font-size:20px;
                        font-weight:bold;
                        color:primary"> Area selection &#8983; </v-subheader>
      </v-row>
      <v-row style="height:23px; padding-left:13px">
         <v-subheader style="font-size:14px;
                             font-weight:bold;"
                             > Top-left &#8598; </v-subheader>
      </v-row>
      <v-row
    style="padding-left: 20px; width: 300px">
      <v-subheader style="padding-left: 11px;
                 font-size:20px;
                 padding-top: 13px;"
                 >{{ latTL }} Lat, {{ lngTL }} Lng</v-subheader>
      </v-row>
      <v-row style="padding-left: 13px; height:23px">
         <v-subheader style="font-size:14px;
                             font-weight:bold;"
                             > Bottom-right &#8600; </v-subheader>
      </v-row>
      <v-row
      style="padding-left: 20px">
      <v-subheader style="padding-left: 11px;
                 font-size:20px;
                 padding-top: 13px
                 color: blue">{{ latBR }} Lat, {{ lngBR }} Lng</v-subheader>
      </v-row>
      <h3>________________________________</h3>
    </div>
    <v-row style="height:35px; padding-left:13px">
    <v-subheader style="font-size:20px;
                        font-weight:bold;
                        color:primary"> Map-marker &#128205; </v-subheader>
    </v-row>
    <v-row
    style='padding-left:20px; width:300px'>
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
            dense
          ></v-text-field>
       </v-col>
           <v-col cols="3">
          <v-text-field
            v-model.number="lng"
            label="Lon"
            :rules="[rules.emptyField,
                     rules.isFloat,
                     rules.inRange(-180,180)]"
            dense
          ></v-text-field>
           </v-col>
           <v-btn 
           :disabled="lng < -180 || lng >= 180 || lng == '' ||
                        lat <= -90 || lat >= 90 || lat == '' ||
                        ( lat == this.valueLat.toFixed(2) && lng == this.valueLng.toFixed(2) )"
           :style="[ latTL != 999 ? 
                    {'width':'10px', 'position':'absolute', 'right':'30px', 'top':'315px'} :
                    {'width':'10px', 'position':'absolute', 'right':'30px', 'top':'125px'} ]"
           color="primary" 
           @click="setValue">
             Set
           </v-btn>
      </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {
      test: false,
      lat: this.valueLat.toFixed(2),
      lng: this.valueLng.toFixed(2),
      latTL: this.valueLatTL.toFixed(2),
      lngTL: this.valueLngTL.toFixed(2),
      latBR: this.valueLatBR.toFixed(2),
      lngBR: this.valueLngBR.toFixed(2),
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
    valueLatTL: {
      type: Number,
      required: false,
    },
    valueLngTL: {
      type: Number,
      required: false,
    },
    valueLatBR: {
      type: Number,
      required: false,
    },
    valueLngBR: {
      type: Number,
      required: false,
    },
    polygonScoped: {
      type: Object,
      required: false,
    }
  },
  computed: {
    bboxEnabled() {
      return this.latTL != 999 ? 'Marker-box' : 'MarkerBbox-box' 
    }
  },
  watch: {
    valueLat(value) {
      this.lat = value.toFixed(2)
    },
    valueLng(value) {
      this.lng = value.toFixed(2)
    },
    valueLatTL(value) {
      this.latTL = value.toFixed(2)
    },
    valueLngTL(value) {
      this.lngTL = value.toFixed(2)
    },
    valueLatBR(value) {
      this.latBR = value.toFixed(2)
    },
    valueLngBR(value) {
      this.lngBR = value.toFixed(2)
    }
  },
  methods: { 
    ...mapActions("wps", ["setMarkerCoordinates", "setPolygon"]),
    setValue() {
     this.setMarkerCoordinates({lat: parseFloat(this.lat), lng: parseFloat(this.lng)})
    },
    setValueBBox() {
      console.log(this.polygonScoped.features[0].geometry.coordinates[0][0][0])
      this.polygonScoped.features[0].geometry.coordinates[0][0][0] = parseFloat(this.latTL)
      this.setPolygon(this.polygonScoped)
      console.log(this.polygonScoped.features[0].geometry.coordinates[0][0][0])
    }
  }
};
</script>

<style>
.Marker-box {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  height: 370px;
  width: 250px;
}
.MarkerBbox-box {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  height: 170px;
  width: 250px;
}
.font-style {
  height: 10%;
}
</style>
