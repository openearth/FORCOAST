<template>
  <div v-if="layers.length" ref="root">
    <v-list class="pa-2" flat >
      <v-list-item-group>
        <template
          v-for="(layer, index) in layers"
        >
          <v-list-item 
            :key="layer.id" 
            :ripple="false"
          >  
            <v-list-item-action>
              <v-switch
                v-model="selectedIds"
                :value="layer.id"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ layer.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-btn
                icon
                class="ml-auto"
                @click="setActiveLegend(layer.id)"
              >
                  <v-icon>
                    mdi-card-bulleted{{
                    layer.id === activeLegend ? '' : '-off'
                    }}-outline
                </v-icon>
            </v-btn>
            <v-list-item-avatar >
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
import { ref, watch, toRefs, computed } from "@vue/composition-api"
import useLegend from "./useLegend"

export default {
	props: { layers: Array },
	setup(props, context) {
		const root = ref(null)
		const selectedIds = ref([])
		const { layers } = toRefs(props)
    
		const { activeLegend, setActiveLegend } = useLegend(selectedIds)
		const selectedLayers = computed(() => {
			return selectedIds.value
				.map(id => layers.value.find(layer => layer.id === id))
		})
		watch(activeLegend, newActiveLegend => context.emit("active-legend-change", newActiveLegend))
		watch(selectedLayers, newSelectedLayers => context.emit("active-layers-change", newSelectedLayers))
		return { root, activeLegend, setActiveLegend, selectedIds, selectedLayers }
	}, 
}
</script>
