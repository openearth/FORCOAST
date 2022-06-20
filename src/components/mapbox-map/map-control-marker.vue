<template>
  <div></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  inject: ["getMap"],
  data() {
    return {
      marker: null,
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
        this.marker = new mapboxgl.Marker({
          draggable: true,
        })   
          .setLngLat(this.markerLngLat)
          .addTo(map);
          this.marker.on("dragend", () => {
          const lngLat = this.marker.getLngLat();
          this.setMarkerCoordinates(lngLat);
          });
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
    ...mapState("layers", ["selectedAreaBBox"]),

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

        this.marker = new mapboxgl.Marker({
          draggable: true,
        })   
          .setLngLat([this.center[0], this.center[1]])
          .addTo(map);
        this.marker.on("dragend", () => {
          const lngLat = this.marker.getLngLat();
          this.setMarkerCoordinates(lngLat);
        });
      }
    },
  },
};
</script>