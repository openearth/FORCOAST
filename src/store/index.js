import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		selectedCategory: null,
		selectedService:null,
		selectedAreaBBox: null,
    polygon: null,
    selectedTime: null,
    markerLngLat: {},
    iconCategory: null,
    timeSpan: [], // service-viewer data() timeSpan has replaced the state. Check if needed as state
    timeExtent: []
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
    SET_SELECTED_TIME(state, time) {
      state.selectedTime = time
    },
    SET_MARKER_COORDINATES(state, lnglat) {
      state.markerLngLat = lnglat
    },
    SET_TIME_SPAN(state, timespan) {
      state.timeSpan = timespan
    },
    SET_TIME_EXTENT(state, extent) {
      state.timeExtent = extent
    },
    SET_ICON_CATEGORY(state, icon) {
      state.iconCategory = icon
    }
	},
}) 