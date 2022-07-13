<template>
  <div :class="bboxEnabled">
   <div v-if="drawPolygonIcon">
      <v-row style="padding-left:13px; height:30px; margin-top:-8px">
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
     </div>
    <div v-if="latTL != 999">
      <v-row style="height:35px; padding-left:13px">
         <v-subheader style="font-size:20px;
                        font-weight:bold;
                        color:primary"> Area selection &#8983; </v-subheader>
      </v-row>
      <v-row style="height:18px; padding-left:13px">
         <v-subheader style="font-size:14px;
                             font-weight:bold;"
                             > Top-left &#8598; </v-subheader>
      </v-row>
      <v-row
    style="padding-left: 20px; width: 300px">
      <v-subheader style="padding-left: 11px;
                 font-size:16px;
                 padding-top: 13px;
                 color: #000000"
                 >{{ latTL }} Lat, {{ lngTL }} Lng</v-subheader>
      </v-row>
      <v-row style="padding-left: 16px; height:18px">
         <v-subheader style="font-size:14px;
                             font-weight:bold;"
                             > Bottom-right &#8600; </v-subheader>
      </v-row>
      <v-row
      style="padding-left: 20px">
      <v-subheader style="padding-left: 11px;
                 font-size:16px;
                 padding-top: 13px;
                 color: #000000">{{ latBR }} Lat, {{ lngBR }} Lng</v-subheader>
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
           <v-btn v-if="setButtonEnabled"
           :style="[ latTL != 999 ? 
                    {'width':'10px', 'position':'absolute', 'right':'30px', 'top':'315px'} :
                    {'width':'10px', 'position':'absolute', 'right':'30px', 'top':'125px'} ]"
           value="true"
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
    },
    drawPolygonIcon: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState("wps", ["polygon"]),
    bboxEnabled() {
      if (this.drawPolygonIcon == false) {
      return 'Default-box'
      }
      else if (this.polygon == null && this.drawPolygonIcon == true) {
      return 'Box-select-area'
      }
      else {
      return 'Box-area-selected'
      }
    },
    setButtonEnabled() {
      return !( this.lng < -180 || this.lng >= 180 || this.lng == '' ||
               this.lat <= -90 || this.lat >= 90 || this.lat == '' ||
             ( this.lat == this.valueLat.toFixed(2) && this.lng == this.valueLng.toFixed(2) ) )
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
.Default-box {
  position: absolute;
  top: 0.6rem;
  right: 0.5rem;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  height: 95px;
  width: 250px;
}
.Box-select-area {
  position: absolute;
  top: 0.6rem;
  right: 0.5rem;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  height: 170px;
  width: 250px;
}
.Box-area-selected {
  position: absolute;
  top: 0.6rem;
  right: 0.5rem;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  height: 355px;
  width: 250px;
}
.font-style {
  height: 10%;
}
</style>
