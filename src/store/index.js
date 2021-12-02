import Vue from "vue"
import Vuex from "vuex"
import run from "@/lib/wps/runProcessor"
import getStatus  from "@/lib/wps/getStatus"
import getWMSCapabilities from "@/lib/getWmsCapabilities";
import extractTimeExtentFromCapabilities from  "@/lib/extract-time-extent-from-capabilities"
import buildWmsLayer from "@/lib/build-wms-layer";

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
    runTimeExtent: [], 
    activeLayers: [],
    jobStatus: null,
    statusLink: null,
    selectedEntryValue: null,
    capabilities: null,
	},
  getters: {
    // always make the getCapabilities with the last selected Layer.
    selectedLayer(state) {
      const { activeLayers } = state
      if (!activeLayers.length) {
        return null
      }
      return activeLayers[0] // TODO change it to array length -1
    },
    /* WMS layer of selected layer */
    wmsLayer(state, getters) {
     /*  const { selectedTime , 
            if (selectedTime && activeLayers) {
              const modifiedActiveLayers = activeLayers.map((layer) => ({
                ...layer,
                time: selectedTime,
              }));
              return modifiedActiveLayers[0];
      } */
      
      const { selectedLayer } = getters
      if (!selectedLayer) {
        return null
      }
      return buildWmsLayer(selectedLayer) 
    },
    timeExtent(state, getters) {
      const { capabilities, activeLayers } = state
      console.log('activeLayers in timeExtent', activeLayers)
      const { selectedLayer } = getters
      if (!capabilities & !selectedLayer) {
        return []
      }
      return extractTimeExtentFromCapabilities(capabilities, selectedLayer)
    }
  },
	mutations: { 
		SET_CATEGORY(state, category) { 
			state.selectedCategory = category
		},
    SET_AREA(state, area) { 
      state.selectedArea = area
    },
    SET_AREA_ID(state, areaId) { 
      state.selectedAreaId = areaId
    },
		SET_SERVICE(state, service) {
			state.selectedService = service 
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
      state.activeLayers = []
    },
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
    CLEAR_SELECTED_ENTRY_VALUE(state) {
      state.selectedEntryValue = null
    },
    SET_CAPABILITIES(state, capabilities) {
      state.capabilities = capabilities
    },
    CLEAR_CAPABILITIES(state) {
      state.capabilities = null
    },
    SET_SELECTED_ENTRY_TYPE(state, entryType) {
      state.selectedEntryType = entryType
    },
    CLEAR_SELECTED_ENTRY_TYPE(state, entryType) {
      state.selectedEntryType = null
    },
	},
  actions: { 
    setActiveLayers(context, payload) {
      context.commit("SET_ACTIVE_LAYERS", payload)
    },
    async getCapabilities(context) {
      const { selectedLayer } = context.getters
      try {
        const response = await getWMSCapabilities({
          url: selectedLayer.url,
        });
        const capabilities = response.WMT_MS_Capabilities.Capability;
        context.commit('SET_CAPABILITIES', capabilities)
      } catch (error) {
        console.log("error:", error);
      }
    },
    async runProcessor({commit, state}) {

      // Set pilot area for selected service
      const area = state.selectedAreaId

      // Set id of selected service
      const id = state.selectedService.id;

      // Set lat and lon input values
      const lat = state.markerLngLat.lat;
      const lon = state.markerLngLat.lng;
 
      // Set values from entry form
      var lim = ""
      if (state.selectedEntryType == "lim") {
        lim = state.selectedEntryValue  
      }
      var period = ""
      if (state.selectedEntryType == "period") {
        period = state.selectedEntryValue  
      }
      
      // Set source based on lat and lon
      const source = "[" + state.markerLngLat.lng + "," + state.markerLngLat.lat + "]"
      
      // Set bounding box in proper format:
      // [[lon_min,lat_min],[lon_max,lat_min],[lon_max,lat_max],[lon_min,lat_max]]
      var target = ""
      if (state.polygon) {
        let lon_max = Math.max(state.polygon.features[0].geometry.coordinates[0][0][0], state.polygon.features[0].geometry.coordinates[0][1][0], state.polygon.features[0].geometry.coordinates[0][2][0], state.polygon.features[0].geometry.coordinates[0][3][0]);
        let lon_min = Math.min(state.polygon.features[0].geometry.coordinates[0][0][0], state.polygon.features[0].geometry.coordinates[0][1][0], state.polygon.features[0].geometry.coordinates[0][2][0], state.polygon.features[0].geometry.coordinates[0][3][0]);
        let lat_max = Math.max(state.polygon.features[0].geometry.coordinates[0][0][1], state.polygon.features[0].geometry.coordinates[0][1][1], state.polygon.features[0].geometry.coordinates[0][2][1], state.polygon.features[0].geometry.coordinates[0][3][1]);
        let lat_min = Math.min(state.polygon.features[0].geometry.coordinates[0][0][1], state.polygon.features[0].geometry.coordinates[0][1][1], state.polygon.features[0].geometry.coordinates[0][2][1], state.polygon.features[0].geometry.coordinates[0][3][1]);
        // console.log(lon_max)
        // console.log(lon_min)
        // console.log(lat_max)
        // console.log(lat_min)
        target = "[[" + lon_min + "," + lat_min + "],[" + lon_max + "," + lat_min + "],[" + lon_max + "," + lat_max + "],[" + lon_min + "," + lat_max + "]]"
      }
      console.log(target)

      const response = await run(state.selectedTime, period, id, area, source, target, lat, lon, lim)
      //const response = await run(testtime, id)
      const statusLink = response[0].value.href

      commit("SET_STATUS_LINK", statusLink)
      if (statusLink) {
        const status = await getStatus(statusLink)
        commit("SET_JOB_STATUS", status)
      }

      if (state.jobStatus == "successful") {
        console.log("successful!")
      }
    },
    clearTimeExtent(context) {
      context.commit('CLEAR_TIME_EXTENT')
    },
    clearSelectedTime(context) {
      context.commit('CLEAR_SELECTED_TIME')
    },
    clearCapabilities(context) {
      context.commit('CLEAR_CAPABILITIES')
    }
  }
}) 
//TODO store became too big. Split it perhaps in 2 or 3 stores