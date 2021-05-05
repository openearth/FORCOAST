<template>
  <div>
    <v-dialog v-model="dialog" width="700">
      <v-card height="600" width="700">
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
  },
  data() {
    return {
      bbox: null,
      featuresInfo: [],
      disabled: true, // becomes true when featuresINfo
      dialog: true,
      graph: null,
      // if featuresInfo emit features loaded
      // emit close ? or v-model dialog someway
    };
  },
  mounted() {
    const lng = this.lngLat.lng;
    const lat = this.lngLat.lat;
    this.bbox =
      lng - 0.1 + "," + (lat - 0.1) + "," + (lng + 0.1) + "," + (lat + 0.1);
    this.getAllFeatureInfo();
  },

  watch: {
    featuresInfo() {
      console.log("featuresInfo", this.featuresInfo);
      // call graph
      this.createGraph();
      this.updateGraph();
    },
    lngLat() {
      console.log("watch lnglat", this.lngLat);
    },
    dialog() {
      console.log("dialog prop in the component", this.dialog);
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
        return feature.properties.GRAY_INDEX;
      } catch (error) {
        console.log("error:", error);
      }
    },
    async getAllFeatureInfo() {
      this.featuresInfo = await Promise.all(
        this.timeSpan.map(async (time) => {
          const response = await this.getFeatureInfo(time);
          return response;
        })
      );
    },
    closeDialog() {
      this.dialog = false;
      this.$emit("close-dialog", false);
    },
    createGraph() {
      var dom = document.getElementById("graph-container");
      console.log("dom", dom);
      this.graph = echarts.init(dom);
      console.log("graph created", this.graph);
    },
    updateGraph() {
      const option = {
        title: {
          text: this.layer.name,
          left: "center",
          top: 20,
        },
        xAxis: {
          type: "category",
          data: this.timeSpan,
          name: "Date",
          nameLocation: 'center',
          nameTextStyle: {
            fontSize: 16,
            padding: 10,
          }
        },
        yAxis: {
          type: "value",
          name: "Value",
          nameLocation: 'center',
          nameTextStyle: {
            fontSize: 16,
            padding: 10,
          }
        },
        grid: {
          show: "true",
          width: 'auto',
          height: 'auto'
        },
        series: [
          {
            data: this.featuresInfo,
            type: "line",
            tooltip: {
              show: "true",
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            }
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
  width: 700px;
  height: 500px;
}
</style>