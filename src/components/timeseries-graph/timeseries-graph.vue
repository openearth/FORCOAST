<template>
  <div>
    <v-dialog v-model="dialog" width="800">
      <v-card height="600" width="900" v-on-clickaway="closeDialog">
        <div id="graph-container"></div>
        <v-card-actions>
          <v-btn block color="primary" bottom text @click="closeDialog">
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import featureInfo from "@/lib/featureInfo";
import * as echarts from "echarts";
import "echarts-gl";
import { mixin as clickaway } from 'vue-clickaway';
import { mapState } from 'vuex';

export default {
  props: {
    layer: {
      type: Object,
    },
    lngLat: {
      type: Object,
    },
    timeSpan: {
      type: Array,
    },
    timeSpanUnfiltered: {
      type: Array,
    },
  },
  data() {
    return {
      bbox: null,
      featuresInfo: [],
      disabled: true, 
      dialog: true,
      graph: null,
      timeAxisName: [],
    };
  },
  mixins: [ clickaway ],
  template: '<p v-on-clickaway="away">Click away</p>',
  mounted() {
    const lng = this.lngLat.lng;
    const lat = this.lngLat.lat;
    this.bbox =
      lng - 0.1 + "," + (lat - 0.1) + "," + (lng + 0.1) + "," + (lat + 0.1);
    this.getAllFeatureInfo();
  },
  computed: {
    ...mapState("layers", ["activeLayers"])
  },
  watch: {
    featuresInfo() {
      // call graph
      this.createGraph();
      this.updateGraph();
    },
  },
  methods: {
    async getFeatureInfo(time) {
      try {
        const info = await featureInfo({
          url: this.layer.url,
          layer: this.layer.layer,
          bbox: this.bbox,
          time: time,
        });
        const feature = info.features[0];        
        return Object.entries(feature.properties).map(([key,value]) => value)[0]; 
     }catch (error) {
       console.log("Missing data for timestamp");
    }
    },
    // calls the getFeatureinfo for every element in the timeSpan array
    async getAllFeatureInfo() {
      this.featuresInfo = await Promise.all(
        this.timeSpanUnfiltered.map(async (time) => {
          const response = await this.getFeatureInfo(time)
          return response;
        })
      );
      this.featuresInfo = this.featuresInfo.map( (value) => value == undefined ? null : value )
      this.timeAxisNames(this.timeSpanUnfiltered)
    },
    timeAxisNames(array) {
      if (this.activeLayers[0].interval == "hourly") {
        array.forEach((date, index) => {
          this.timeAxisName[index] = date.substr(0, 10) + ':' + date.substr(11, 2) + 'h'
        });
      } else {
        this.timeAxisName = array
      }
    },
    closeDialog() {
      this.dialog = false;
      this.$emit("close-dialog", false);
    },
    createGraph() {
      var dom = document.getElementById("graph-container");
      this.graph = echarts.init(dom);
    },
    updateGraph() {
      const option = {
        title: {
          text: this.layer.name,
          left: "center",
          top: 20,
        },
        tooltip: {
          trigger: 'axis'
        },
       toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          data: this.timeAxisName,
          name: "Time (UTC)",
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 16,
            padding: 20,
          },
        },
        yAxis: {
          type: "value",
          name: this.layer.unit,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 16,
            padding: 20,
          },
        },
        grid: {
          show: "true",
          width: "auto",
          height: "auto",
        },
        series: [
          {
            data: this.featuresInfo,
            type: "line",
            tooltip: {
              show: "true",
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
          },
        ],
      };
      this.graph.clear();
      this.graph.setOption(option);
    },
  },
};
</script>
<style>
#graph-container {
  width: 800px;
  height: 500px;
}
</style>
