<template>
  <div></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

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
    deferredMountedTo(map) {
      if (this.center) {
        this.addToMap(map);
      }
    },

    addToMap(map) {
      this.marker = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat([this.center[0], this.center[1]])
        .addTo(map);

      this.marker.on("dragend", () => {
        const lngLat = this.marker.getLngLat();
        this.$store.commit("SET_MARKER_COORDINATES", lngLat);
      });
    },
  },
};
</script>