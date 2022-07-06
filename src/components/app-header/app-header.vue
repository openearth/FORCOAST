<template>
  <v-app-bar app color="primary" dark clipped-left>
    <img :src="require(`@/assets/FORCOAST_Fish_Logo_White.png`)" height="30" />
    <img
      :src="require(`@/assets/FORCOAST_Oyster_Logo_White.png`)"
      height="30"
    />
    <img
      :src="require(`@/assets/FORCOAST_Mussel_Logo_White.png`)"
      height="30"
    />
    <img :src="require(`@/assets/empty.png`)" height="10" />
    <v-tour :steps="tourSteps" :options="tourConfig" name="introduction" @click.native="nextStep"></v-tour>
    <v-toolbar-title>
      <router-link to="/" class="white--text text-decoration-none">{{
        title
      }}</router-link>
    </v-toolbar-title>

    <v-spacer />

    <v-tabs background-color="primary" dark right style="width: auto">
      <v-tab href="https://forcoast.eu/services/" exact data-v-step="1"> Home page </v-tab>
      <!-- v-menu close on content click : set a data value that is boolean and becomes true when a 
      service is clicked -->
      <v-menu
        v-for="(category, index) in categories"
        :key="index"
        :close-on-content-click="closeMenu"
        offset-y 
      >
        <template v-slot:activator="{ on, attrs }">
          <v-tab
            data-v-step="2"
            v-bind="attrs"
            v-on="on"
          >
            {{ category.name }}
          </v-tab>
        </template>
        <v-list style="overflow-y: auto; max-height: 500px">
          <v-list-group
            no-action
            sub-group
            v-for="(area, index) in category.areas"
            @click="onSetSelectedAreaBBox(area.bbox); 
                    leaveMenuOpen()"
            :key="index"
            link
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ area.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(service, index) in area.services"
              :key="index"
              link
              @click="
                onSetService(area.name, area.id, service);
                onSetSelectedAreaBBox(area.bbox);
                track(service, area.id);
              "
              :to="{
                name: 'Services',
                params: { area: area.id, service: service.id,category: category.id },
              }"
            >
              <v-list-item-title v-text="service.name"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-menu>
    </v-tabs>
  </v-app-bar>
</template>

<script>
import { getProjectConfig } from "@/lib/config-utils";
import { importConfig } from "@/lib/config-utils";
import { tourConfig, tourSteps, tourStepCount } from '@/plugins/vue-tour'

import { mapState, mapActions } from "vuex";
import * as Cookies from 'tiny-cookie'

const config = getProjectConfig();

export default {
  data() {
    return {
      title: config.shortName,
      closeMenu: false,
      tourConfig,
      tourSteps,
      tourStepCount
    };
  },
  mounted () {
    this.showTour()
  },
  watch: {
    $route() {

      const catagories = importConfig("services/services.json");

      // Find indices in services.json for category/area/service combination as speficied in the root
      const category_index = catagories.findIndex( (catagories) => catagories.id === this.$router.currentRoute.params.category);

      // Add check to avoid error when entering site on root level /
      if (category_index > -1) {
        const area_index = catagories[category_index].areas.findIndex( (areas) => areas.id === this.$router.currentRoute.params.area);
        const service_index = catagories[category_index].areas[area_index].services.findIndex( (services) => services.id === this.$router.currentRoute.params.service);

        this.onSetCategory(this.$router.currentRoute.params.category, catagories[category_index].icon)
        this.onSetService(catagories[category_index].areas[area_index].name, this.$router.currentRoute.params.area, catagories[category_index].areas[area_index].services[service_index])
        this.onSetSelectedAreaBBox(catagories[category_index].areas[area_index].bbox)
        this.track(catagories[category_index].areas[area_index].services[service_index],this.$router.currentRoute.params.area)
      }
    },
  },
  computed: {
    categories() {
      // it is confusing to name it categories while it contains the services
      return importConfig("services/services.json");
    },
    ...mapState("layers", ["selectedCategory"]),
  },
  methods: {
    ...mapActions("wps", ["clearMarkerCoordinates", "clearPolygon", "clearJobStatus", "clearSelectedEntryValue",]),
    ...mapActions("layers", ["setCategory", "setArea", "setService","setAreaId", "setIconCategory", "setSelectedAreaBbox", "clearSelectedService","clearSelectedTime", "clearCapabilities"]),
    onSetCategory(category, icon) {
      if (this.selectedCategory !== category) {
        //clear previous service
        this.clearSelectedService();

        this.setCategory(category);
        this.setIconCategory(icon);

        //clear layers/selections
        this.clearSelectedTime();
        this.clearCapabilities();

        //clear wps parameters
        this.clearJobStatus();
        this.clearSelectedEntryValue(); 
        this.clearMarkerCoordinates();
        this.clearPolygon();
        
      }
      this.closeMenu = false;
    },
    onSetService(area, area_id, service) {
      const selectedService = service;

      if (selectedService !== this.selectedService) {
        // clear previous service
        this.clearSelectedService(); 

        this.setArea(area);
        this.setAreaId(area_id);

        //clear layers/selections
        this.clearSelectedTime();
        //clear wps parameters
        this.clearJobStatus(); 
        this.clearSelectedEntryValue();
        this.clearMarkerCoordinates();
        this.clearPolygon();
      }

      this.setService(selectedService);
      // close menu after clicked
      this.closeMenu = true;
    },
    onSetSelectedAreaBBox(bbox) {
      this.setSelectedAreaBbox(bbox);
    },
    leaveMenuOpen() {
      console.log(tourStepCount)
      this.closeMenu = false;
    },
    track (service, area) {
      this.$gtag.event('service_selection', {
        'event_category': service.id + '_' + area,
        'event_area_id': area,
        'event_service_id': service.id
      })
    },
    //showTour () {
    //    this.$tours.introduction.start()
    //}
    showTour (hideTour = Cookies.get('hideTour')) {
      if (!hideTour) {
        this.$tours.introduction.start()
        Cookies.set('hideTour', false)
      }
    },
    nextStep () {
      if (tourStepCount == 2 && window.location.href == "https://forcoast.netlify.app/") {
        this.$router.push('sector=wild_fishery&service=suitable_fishing_areas&area=eforie?step3').catch(()=>{})
      }
      if (tourStepCount == 3) {
        this.$router.push('?step4').catch(()=>{})
      }
      if (tourStepCount == 4) {
        this.$router.push('?step5').catch(()=>{})
      }
    }
  },
};
</script>