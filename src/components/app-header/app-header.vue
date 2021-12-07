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
    <v-toolbar-title>
      <router-link to="/" class="white--text text-decoration-none">{{
        title
      }}</router-link>
    </v-toolbar-title>

    <v-spacer />

    <v-tabs background-color="primary" dark right style="width: auto">
      <!-- <v-tab :to="{ name: 'Introduction' }" exact> Home page </v-tab> -->
      <v-tab href="https://forcoast.eu/services" exact> Home page </v-tab>
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
            v-bind="attrs"
            v-on="on"
            @click="onSetCategory(category.name, category.icon)"
            :to="{
              name: 'Category',
              params: { category_id: category.id },
            }"
          >
            {{ category.name }}
          </v-tab>
        </template>
        <v-list style="overflow-y: auto; max-height: 500px">
          <v-list-group
            no-action
            sub-group
            v-for="(area, index) in category.areas"
            @click="onSetSelectedAreaBBox(area.bbox)"
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
              "
              :to="{
                name: 'Service',
                params: {category_id: category.id,
                         area_id: area.id,
                         service_id: service.id
                   },
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

import { mapState, mapActions } from "vuex";

const config = getProjectConfig();

export default {
  data() {
    return {
      title: config.shortName,
      closeMenu: false,
    };
  },
  watch:{
    $route (to, from){
        const area_id = this.$route.params.area_id
        const category_id = this.$route.params.category_id
        const service_id = this.$route.params.service_id

        // Loop over all categories
        for (const category in this.categories) {
          if (this.categories[category].id === category_id) {
            this.setCategory(category_id, this.categories[category].icon)
            // Loop over all areas
            for (const area in this.categories[category].areas) {
              if (this.categories[category].areas[area].id === area_id) {
                console.log("router:")
                console.log(this.categories[category].areas[area].bbox)
                this.setSelectedAreaBBox(this.categories[category].areas[area].bbox);
                  // Loop over all services
                  for (const service in this.categories[category].areas[area].services) {
                    if (this.categories[category].areas[area].services[service].id === service_id) {
                      this.setService(this.categories[category].areas[area].name, area_id, this.categories[category].areas[area].services[service]);
                    }
                  }
              }
            }
          }
        }
    }
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
  },
};
</script>