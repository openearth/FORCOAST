<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-toolbar-title>
      <router-link
        to="/"
        class="white--text text-decoration-none"
      >{{ title }}</router-link>
    </v-toolbar-title>

    <v-spacer />

    <v-tabs background-color="primary" dark right style="width: auto">
      <v-tab :to="{ name: 'Introduction' }" exact>
        Home page
      </v-tab>
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
            @click="setCategory(category.name)"
            :to="{
            name: 'Services',
            params: { id: category.id },
          }"
          >
            {{ category.name }}
          </v-tab>
        </template> 
        <v-list>
          <v-list-group
            no-action
            sub-group
            v-for="(area, index) in category.areas"
            @click="setSelectedAreaBBox(area.bbox)"
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
              @click="setService(area.name, service)"
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
import { getProjectConfig } from "@/lib/config-utils"
import { importConfig } from "@/lib/config-utils"

import { mapState } from "vuex"

const config = getProjectConfig()

export default {
	data() {
		return {
			title: config.shortName,
			closeMenu: false
		}
	},
	computed: {
		categories() { // it is confusing to name it categories while it contains the services
			return importConfig("services/services.json")
		},
		...mapState({
			selectedCategory: state => state.selectedCategory 
		})
	}, 
	methods: { 
		setCategory (category) {
			if (this.selectedCategory !== category) {
				this.$store.commit("CLEAR_SELECTED_SERVICE")
				this.$store.commit( "SET_CATEGORY", category)
			}
			this.closeMenu=false
		},
		setService (area, service) {
			const selectedService = service
			// append selectedService object with area name
			this.$store.commit("SET_SERVICE", selectedService)
			// close menu after clicked
			this.closeMenu=true
		},
		setSelectedAreaBBox(bbox) {
			this.$store.commit("SET_SELECTED_AREA_BBOX", bbox)
		}
	},
}
</script>