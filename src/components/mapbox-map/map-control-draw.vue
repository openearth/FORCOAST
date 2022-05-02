<template>
  <div></div>
</template>
<script>
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode"
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { mapActions } from "vuex";

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
        this.setPolygon(this.polygon);
      } else {
        this.clearPolygon();
      }
    },
  },

  methods: {
    ...mapActions("wps",["setPolygon", "clearPolygon"]),
    deferredMountedTo(map) {
      this.addToMap(map);
    },

    addToMap(map) {
      this.modes = MapboxDraw.modes
      this.modes.draw_polygon = DrawRectangle
      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });
      map.addControl(this.draw, "bottom-right");

      map.on("draw.create", () => (this.polygon = this.draw.getAll())); 
      map.on("draw.delete", () => (this.polygon = this.draw.getAll()));
      map.on("draw.update", () => (this.polygon = this.draw.getAll()));
    },
  },
};
</script>