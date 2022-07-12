<template>
  <div></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { limitsA1Sado } from "./service-limits/limits_a1_sado";
import { limitsA1A3Limfjord } from "./service-limits/limits_a1_a3_limfjord";
import { limitsA2R1Galway } from "./service-limits/limits_a2_r1_galway";
import { limitsA2BlackSea } from "./service-limits/limits_a2_black_sea";
import { limitsA4NorthSea } from "./service-limits/limits_a4_north_sea";
import { limitsF1BlackSea } from "./service-limits/limits_f1_black_sea";
import { limitsF2Biscay } from "./service-limits/limits_f2_biscay";
import { limitsF2Adriatic } from "./service-limits/limits_f2_adriatic";

export default {
  inject: ["getMap"],
  data() {
    return {
      marker: null,
      limitsA1Sado,
      limitsA1A3Limfjord,
      limitsA2BlackSea,
      limitsA2R1Galway,
      limitsA4NorthSea,
      limitsF1BlackSea,
      limitsF2Biscay,
      limitsF2Adriatic,
      inside: true,
      serviceArea: null
    };
  },
  props: {
    center: {
      type: Array,
      required: true,
    },
  },
  computed: {
  ...mapState("wps", ["markerLngLat"]),
  markerChange(){
    return this.markerLngLat
  }
  },
  watch: {
    markerChange(){

      
    const map = this.getMap();
    if (this.marker) {
        this.marker.remove();
        
        var popup = new mapboxgl.Popup({ closeOnClick:true })
        .setText('Marker is out of service limits')
        .addTo(map);


        this.marker = new mapboxgl.Marker({
          draggable: true,
        })   
          .setLngLat(this.markerLngLat)
          .addTo(map)
          this.marker.on("dragend", () => {
          const lngLat = this.marker.getLngLat();
          this.setMarkerCoordinates(lngLat);
          this.isItInside(lngLat)
          });
          if ( this.inside == false ) {
            this.marker.setPopup(popup)
          }
    }
    
     
     },
    center() {
      // if it is already loaded then remove it and move it and re-add it to the correct center
      if (this.marker != null ) {
      this.marker.remove();
      }
      const map = this.getMap();
      if (map) {
        this.addToMap(map);
      }
    },
  },
  mounted() {
    const map = this.getMap();
    // if we are already loaded
    if (map) {
      this.addToMap(map);
    }
  },
  destroyed() {
    this.marker.remove();
  },
  methods: {
    ...mapActions("wps", ["setMarkerCoordinates", "clearMarkerCoordinates"]),
    ...mapState("layers", ["selectedAreaBBox", "selectedService", "selectedAreaId"]),

    deferredMountedTo(map) {
      if (this.center) {
        this.addToMap(map);
      }
    },

    addToMap(map) {
      //if clause so that if no service module is selected, no marker is loaded
      if (this.selectedAreaBBox() != null ) {
            //if clause so that when visiting the website from a different url (then base-url), the marker is still loaded
            if (this.center[0] == 0 && this.center[1] == 0 ) {
              this.center[0] = (this.selectedAreaBBox()[0][0]+this.selectedAreaBBox()[1][0])/2
              this.center[1] = (this.selectedAreaBBox()[0][1]+this.selectedAreaBBox()[1][1])/2
              this.setMarkerCoordinates({lng:this.center[0], lat:this.center[1]})
             }
        if (this.marker != null) {
          this.marker.remove()
        }
        this.marker = new mapboxgl.Marker({
          draggable: true,
        })   
          .setLngLat([this.center[0], this.center[1]])
          .addTo(map);
        this.marker.on("dragend", () => {
          const lngLat = this.marker.getLngLat();
          this.setMarkerCoordinates(lngLat);
          this.isItInside(lngLat)
        });
      }
    },
    isItInside(lngLatValue) {
        if ( (this.selectedService().wps_id == "a1" || this.selectedService().wps_id == "a3") 
              && this.selectedAreaId() == "limfjord"){
          this.serviceArea = this.limitsA1A3Limfjord 
          }
        if ( this.selectedService().wps_id == "a1" 
              && this.selectedAreaId() == "sado_estuary"){
          this.serviceArea = this.limitsA1Sado
          }
        if ( (this.selectedService().wps_id == "a2" || this.selectedService().wps_id == "r1")
              && this.selectedAreaId() == "galway"){
          this.serviceArea = this.limitsA2R1Galway
          }
        if (this.selectedService().wps_id == "a2"
              && this.selectedAreaId() == "eforie"){
          this.serviceArea = this.limitsA2BlackSea
          }
        if ( (this.selectedService().wps_id == "a4" || this.selectedService().wps_id == "r1")
              && this.selectedAreaId() == "southern_north_sea"){
          this.serviceArea = this.limitsA4NorthSea
        }
        if (this.selectedService().wps_id == "f1"
              && this.selectedAreaId() == "eforie") {
          this.serviceArea = this.limitsF1BlackSea
          }
        if (this.selectedService().wps_id == "f2"
              && this.selectedAreaId() == "bay_of_biscay") {
          this.serviceArea = this.limitsF2Biscay
          }
        if (this.selectedService().wps_id == "f2"
              && this.selectedAreaId() == "northern_adriatic_sea") {
          this.serviceArea = this.limitsF2Adriatic
          }
            for (this.i in this.serviceArea) {
              const inside = this.RayCastingAlgorithm([ lngLatValue.lng, lngLatValue.lat ], this.serviceArea[this.i])
                if (inside == true) {
                  this.inside = true
                  break
                }  
                else {
                  this.inside = false
                }    
              }
        return this.inside

    },
    RayCastingAlgorithm(point, vs) {
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
  },
  },
};
</script>
