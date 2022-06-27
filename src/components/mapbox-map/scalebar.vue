<template>
  <div></div>
</template>

 <script>
import mapboxgl from "mapbox-gl";

export default {
    inject: ["getMap"],
    mounted() {
        const map = this.getMap();
        if (map) {
        this.addToMap(map);
        }
    },
    methods: {
        deferredMountedTo(map) {
              this.addToMap(map);
        },
        addToMap(map) {
            const scale = new mapboxgl.ScaleControl({
            maxWidth: 150,
            padding: {top: 0, bottom:0, left: 500, right: 0},
            unit: 'metric'
            });
            map.addControl(scale, "bottom-left");
        }
    }
};
 </script>