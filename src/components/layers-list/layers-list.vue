<template>
  <div>
    <v-list class="pa-2" flat >
      <v-list-item-group>
        <template
          v-for="(layer, index) in layers"
        >
          <v-list-item 
            :key="layer.id" 
          >  
            <v-list-item-action>
              <v-switch></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ layer.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <img :src="require(`@/assets/${layer.icon}`)">
            </v-list-item-avatar>
          </v-list-item>
          <v-divider :key="index" v-if="index !== layers.length - 1"/>
        </template>
      </v-list-item-group>
    </v-list> 
  </div>  
</template>

<script>
export default {
    data() { 
      return {
        layers:[
          {
          id: "chw2-vector:gar_economy",
          name: "Total capital stock",
          layer: "chw2-vector:gar_economy",
          url: "https://coastalhazardwheel.avi.deltares.nl/geoserver/ows",
          icon:"fish.png"
        },
        {
          id: "chw2-vector:test_layer",
          name: "Total capital stock",
          layer: "chw2-vector:gar_economy",
          url: "https://coastalhazardwheel.avi.deltares.nl/geoserver/ows",
          icon:"fish.png"
        }
          ],
        icon:"@/assets/fish.png"
      }
       
    }
}
 </script>
