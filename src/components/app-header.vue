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
        v-for="(tab, index) in tabs"
        :key="index"
        :close-on-content-click="false" 
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-tab
            v-bind="attrs"
            v-on="on"
            :to="{
            name: 'Services',
            params: { id: tab.id },
          }"
          >
            {{ tab.name }}
          </v-tab>
        </template> 
        <v-list>
          <v-list-group
            no-action
            sub-group
            v-for="(area, index) in tab.areas"
            :key="index"
            link
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ area.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="service in area.services"
              :key="service"
              link
            >
                <v-list-item-title v-text="service"></v-list-item-title>
              </v-list-item>
          </v-list-group>
        </v-list>
      </v-menu>
    </v-tabs>
  </v-app-bar>
</template>

<script>
import { getProjectConfig } from '@/lib/config-utils';
import { importConfig } from '@/lib/config-utils'

const config = getProjectConfig()

export default {
  data() {
    return {
      title: config.shortName,
    };
  },
  computed: {
    tabs() {
      return importConfig(`services/services.json`)
    }
  }


};
</script>