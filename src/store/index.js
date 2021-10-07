import Vue from "vue"
import Vuex from "vuex"
import runF2 from "@/lib/wps/runProcessorF2"
import getStatus  from "@/lib/wps/getStatus"


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
    timeSpan: [], //TODO service-viewer data() timeSpan has replaced the state. Check if needed as state
    timeExtent: [],
    activeLayers: null,
    jobStatus: null,
    statusLink: null,
	},
  getters: {
    activeLayers(state) {
      
      const selectedTime = state.selectedTime
      const activeLayers = state.activeLayers
      if (selectedTime && activeLayers) {
              const modifiedActiveLayers = activeLayers.map((layer) => ({
                ...layer,
                time: selectedTime,
              }));
              return modifiedActiveLayers;
      }

    }
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
    CLEAR_SELECTED_TIME(state, time) {
      state.selectedTime = null
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
    CLEAR_TIME_EXTENT(state) {
      state.timeExtent = []
    },
    SET_ICON_CATEGORY(state, icon) {
      state.iconCategory = icon
    },
    SET_ACTIVE_LAYERS(state, layers) {
      state.activeLayers = layers
    },
    CLEAR_ACTIVE_LAYERS(state) { 
      state.activeLayers = null
    },
    //TODO See if I will use it
    SET_JOB_STATUS(state, status) {
      state.jobStatus = status
    },
    SET_STATUS_LINK(state, url) {
      state.statusLink = url
    }

	},
  actions: { 
    async runProcessorF2({commit, state}) {
      const response = await runF2(state.selectedTime)
      const statusLink = response[0].value.href
      commit("SET_STATUS_LINK", statusLink)
      if (statusLink) {
        const status = await getStatus(statusLink)
        commit("SET_JOB_STATUS", status)
      }

    }
  }
}) 