<template>
  <div class="d-flex flex-column">
    <div>
      <!-- <h2 class="h2">TEST</h2> -->
      <p>{{ service.name }}</p>
      <p> {{ service.description }}</p>
      <v-divider class="mt-4 mb-4" />
    </div>
    <!-- .sync -->
    <collapsible-card v-if="service.layers"
      title="Select a layer" 
    >
     <layers-list
      :layers="service.layers"
      @active-layers-change="onActiveLayerChange"
      @active-legend-change="onActiveLegendChange"
     ></layers-list>
    </collapsible-card>
    <collapsible-card v-if="service.date_span"
      title="Select a start and an end date" 
    >
     <date-span></date-span>
    </collapsible-card>
    <collapsible-card v-if="service.date"
      title="Select a date" 
    >
     <single-date></single-date>
    </collapsible-card>
    <div v-if="service.execute" class="align-self-center position-fixed"> <!-- TODO: Fixed position of button I prefer at the button -->
      <v-btn 
        color = "primary"
        dark
        class="ml-auto" 
        >{{ service.execute }}</v-btn
      >
    </div>
  </div>
</template>
<script>
import CollapsibleCard from "@/components/collapsible-card";
import LayersList from "@/components/layers-list";
import SingleDate from "@/components/single-date";
import DateSpan from "@/components/date-span";


export default { 
    components: { 
        CollapsibleCard,
        LayersList,
        SingleDate,
        DateSpan,
    },
    props: {
      service: {
        type:Object,
        required: true,
      }
    },
    data() { 
        return { 
            title: "Select a layer",
            layersOn: [],
        }
    },
    methods: {
      onActiveLayerChange(activelayers) { 
        this.$emit("active-layers-change", activelayers)
      },
      onActiveLegendChange(legend) {
        this.$emit("active-legend-change", legend)
      }
    },
    mounted() {
      console.log('service-viewer prop service passed', this.service)
    }
/*     computed: {
      ...mapState({
        selectedService: state => state.selectedService
      }),
    }, */

}
</script>
<style>
.execute {
  position:fixed;
  }
</style>