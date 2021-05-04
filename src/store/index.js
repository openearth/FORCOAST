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
    markerLngLat: {},
    timeSpan: [],
    iconCategory: null,
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
      state.polygon = polygon
    },
    SET_TIME_SELECTED(state, time) {
      state.timeSelected = time
    },
    SET_MARKER_COORDINATES(state, lnglat) {
      state.markerLngLat = lnglat
    },
    SET_TIME_SPAN(state, array) {
      state.timeSpan = array
    },
    SET_ICON_CATEGORY(state, icon) {
      state.iconCategory = icon
    }
	},
}) 