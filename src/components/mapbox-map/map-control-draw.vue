<template>
  <div></div>
</template>
<script>
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

export default {
  inject: ["getMap"],
  data() {
    return {
      polygon: {},
      draw: null,
    };
  },
  mounted() {
    const map = this.getMap();
    // if we are already loaded
    if (map) {
      this.addToMap(map);
    }
  },
  destroyed() {
    const map = this.getMap();
    map.removeControl(this.draw);
  },
  watch: {
    polygon() {
      if (this.polygon.features.length) {
        this.$store.commit("SET_POLYGON", this.polygon);
      } else {
        this.$store.commit("SET_POLYGON", null);
      }
    },
  },

  methods: {
    deferredMountedTo(map) {
      this.addToMap(map);
    },

    addToMap(map) {
      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });
      map.addControl(this.draw, "top-left");

      map.on("draw.create", () => (this.polygon = this.draw.getAll())); //TODO for now polygon is data() later perhaps state
      map.on("draw.delete", () => (this.polygon = this.draw.getAll()));
      map.on("draw.update", () => (this.polygon = this.draw.getAll()));
    },
  },
};
</script>