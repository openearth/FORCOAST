import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		selectedCategory: null,
		selectedService:null,
		selectedAreaBBox: null,
    polygon: null,
    timeSelected: null,
    wmsLayers: [],
	},
	mutations: { 
		SET_CATEGORY(state, category) { 
			state.selectedCategory = category
		},
		SET_SERVICE(state, service) {
			state.selectedService = service // object of service name and area.
		},
		CLEAR_SELECTED_SERVICE(state) {
			state.selectedService = null
		},
		SET_SELECTED_AREA_BBOX(state, bbox) {
			state.selectedAreaBBox = bbox
		},
    SET_POLYGON(state, polygon) {
      console.log("STATE OF POLYGON", polygon)
      state.polygon = polygon
    },
    SET_TIME_SELECTED(state, time) {
      state.timeSelected = time
    },
    ADD_WMS_LAYERS(state, layers) {
      console.log("ADD_WMS_LAYERS", layers)
      state.wmsLayers = layers
      console.log("AND STATE", state.wmsLayers)
    },
    FILTER_WMS_LAYERS(state, layers) {
      
      state.wmsLayers = state.wmsLayers.filter(layer => layers.includes(layer));
      // state.wmsLayers = state.wmsLayers.filter(layer => layer.id !== id);
    },
    REMOVE_WMS_LAYERS(state) {
      console.log("REMOVE WMS LAYERS")
      state.wmsLayers = []
      console.log("state.wmsLayers", state.wmsLayers)
    }
	}

}) 