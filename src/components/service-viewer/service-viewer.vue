<template>
  <div class="d-flex flex-column">
    <div>
      <!-- <h2 class="h2">TEST</h2> -->
      <p>{{ service.name }}</p>
      <p>{{ service.description }}</p>
      <v-divider class="mt-4 mb-4" />
    </div>
    <!-- .sync -->
    <draggable-marker
      v-if="service.components.draggable_marker"
      @show-draggable-marker="onShowDraggableMarker"
    ></draggable-marker>
    <collapsible-card
      v-if="service.components.draw_polygon"
      :title="service.components.draw_polygon.title"
      :polygon="polygon"
      :nextButton="true"
      :expand="1"
    >
      <draw-polygon
        :text="service.components.draw_polygon.text"
        @show-draw-polygon="onShowDrawPolygon"
      ></draw-polygon>
    </collapsible-card>
    <div v-if="service.components.selectable_lists">
      <collapsible-card
        v-for="list in service.components.selectable_lists"
        :key="list"
        :title="list.title"
        :nextButton="true"
        :disabled="true"
        :expand="1"
      >
        <selectable-list :values="list.values"></selectable-list>
      </collapsible-card>
    </div>
    <collapsible-card
      v-if="service.components.layers"
      :expand="0"
      title="Select a layer"
    >
      <layers-list
        :layers="service.components.layers"
        @active-layers-change="onActiveLayerChange"
        @active-legend-change="onActiveLegendChange"
      ></layers-list>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.date_span"
      title="Select a start and an end date"
      :expand="0"
    >
      <date-span></date-span>
    </collapsible-card>
    <collapsible-card
      v-if="service.components.date"
      :expand="0"
      title="Select a date"
    >
      <single-date></single-date>
    </collapsible-card>
    <div v-if="service.execute_action" class="align-self-center position-fixed">
      <v-btn color="primary" dark class="ml-auto">{{
        service.execute_action
      }}</v-btn>
    </div>
  </div>
</template>
<script>
import CollapsibleCard from "@/components/collapsible-card";
import LayersList from "@/components/layers-list";
import SingleDate from "@/components/single-date";
import DateSpan from "@/components/date-span";
import SelectableList from "@/components/selectable-list";
import DraggableMarker from "@/components/draggable-marker";
import DrawPolygon from "@/components/draw-polygon";

export default {
  components: {
    CollapsibleCard,
    LayersList,
    SingleDate,
    DateSpan,
    DraggableMarker,
    DrawPolygon,
    SelectableList,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: "Select a layer",
      layersOn: [],
    };
  },
  methods: {
    onActiveLayerChange(activelayers) {
      this.$emit("active-layers-change", activelayers);
    },
    onActiveLegendChange(legend) {
      this.$emit("active-legend-change", legend);
    },
    onShowDraggableMarker(event) {
      this.$emit("show-draggable-marker", event);
    },
    onShowDrawPolygon(event) {
      this.$emit("show-draw-polygon", event);
    },
  },
};
</script>
<style>
.execute {
  position: fixed;
}
</style>