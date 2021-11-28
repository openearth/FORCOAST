import Vue from "vue"
import Vuex from "vuex"
import run from "@/lib/wps/runProcessor"
import getStatus  from "@/lib/wps/getStatus"


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		selectedCategory: null,
    selectedArea: null,
		selectedService:null,
		selectedAreaBBox: null,
    polygon: null,
    selectedTime: null,
    markerLngLat: {},
    iconCategory: null,
    timeSpan: [], //TODO service-viewer data() timeSpan has replaced the state. Check if needed as state
    timeExtent: [],
    runTimeExtent: [],
    activeLayers: null,
    jobStatus: null,
    statusLink: null,
    selectedEntryValue: null,
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
    SET_AREA(state, area) { 
      state.selectedArea = area
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
    CLEAR_POLYGON(state, polygon) {
      state.polygon = null
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
    CLEAR_MARKER_COORDINATES(state, lnglat) {
      state.markerLngLat = null
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
    SET_RUN_TIME_EXTENT(state, extent) {
      state.runTimeExtent = extent
    },
    CLEAR_RUN_TIME_EXTENT(state) {
      state.runTimeExtent = []
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
    CLEAR_JOB_STATUS(state, status) {
      state.jobStatus = []
    },
    SET_STATUS_LINK(state, url) {
      state.statusLink = url
    },
    SET_OUTPUT_LINK(state, url) {
      state.outputLink = url
    },
    SET_SELECTED_ENTRY_VALUE(state, entryValue) {
      state.selectedEntryValue = entryValue
    },
    CLEAR_SELECTED_ENTRY_VALUE(state, entryValue) {
      state.selectedEntryValue = null
    },
	},
  actions: { 
    async runProcessor({commit, state}) {
      //console.log("test runProcessor:")
      //console.log(state.selectedCategory)
      console.log(state.selectedService.id);
      console.log("SET_SELECTED_ENTRY_VALUE");
      console.log(state.selectedEntryValue);
      //console.log(state.selectedArea);
      //console.log(state.markerLngLat.lat);
      //console.log(state.markerLngLat.lng);
      const lat = state.markerLngLat.lat;
      const lon = state.markerLngLat.lng;
      const lim = state.selectedEntryValue
      //const lim = 2.1
      const area = "eforie"
      const source = [1,2]
      const target = [1,2,3,4]

      //console.log(state.polygon);
      //console.log(state.polygon.features[0].geometry.coordinates[0][0]);
      //const testtime = "2021-11-22"
      const id = state.selectedService.id;
      const response = await run(state.selectedTime, id, area, source, target, lat, lon, lim)
      //const response = await run(testtime, id)
      const statusLink = response[0].value.href
      //console.log("statusLink:")
      //console.log(statusLink)
      commit("SET_STATUS_LINK", statusLink)
      if (statusLink) {
        const status = await getStatus(statusLink)
        commit("SET_JOB_STATUS", status)
      }
      //console.log("SET_JOB_STATUS");
      //console.log(state.jobStatus);
      if (state.jobStatus == "successful") {
        console.log("successful!")
      }

      // ??
      //const outputLink = response[0].value.href
      //commit("SET_OUTPUT_LINK", outputLink)
      //console.log("outputLink:")
      //console.log(outputLink)

    }
  }
}) 