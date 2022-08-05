import run from "@/lib/wps/runProcessor"
import getStatus  from "@/lib/wps/getStatus"
import createStatusLink from "@/lib/wps/create-status-link"

export default {
  namespaced: true,

  state: {
    polygon: null,
    markerLngLat: null,
    jobStatus: null,
    statusLink: null,
    selectedEntryValue: null,
    selectedEntryType: null,
    selectedEntryValueOptional: null,
    selectedEntryTypeOptional: null,
    calculationsTime: null,
    
  },
  getters: {
    getEntryValue: (state) => {
      return state.selectedEntryValue
    },
  },
  mutations: {
    SET_POLYGON(state, polygon) {
      state.polygon = polygon
    },
    CLEAR_POLYGON(state) {
      state.polygon = null
    },
    SET_MARKER_COORDINATES(state, lnglat) {
      state.markerLngLat = lnglat
    },
    CLEAR_MARKER_COORDINATES(state) {
      state.markerLngLat = null
    },
    SET_CALCULATIONS_TIME(state, time) {
      state.calculationsTime = time
    },

    SET_SELECTED_ENTRY_VALUE(state, entryValue) {
      state.selectedEntryValue = entryValue
    },
    SET_SELECTED_ENTRY_VALUE_OPTIONAL(state, entryValueOptional) {
      state.selectedEntryValueOptional = entryValueOptional
    },
    CLEAR_SELECTED_ENTRY_VALUE(state) {
      state.selectedEntryValue = null
    },
    SET_SELECTED_ENTRY_TYPE(state, entryType) {
      state.selectedEntryType = entryType
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
  },
  actions: {
    setPolygon(context, payload) {
      context.commit("SET_POLYGON", payload)
    },
    clearPolygon(context) {
      context.commit("CLEAR_POLYGON")
    },
    setMarkerCoordinates(context, payload) {
      context.commit("SET_MARKER_COORDINATES", payload)
    },
    clearMarkerCoordinates(context) {
      context.commit("CLEAR_MARKER_COORDINATES")
    },
    setSelectedEntryValue(context, payload) {
      context.commit("SET_SELECTED_ENTRY_VALUE", payload)
    },
    setSelectedEntryValueOptional(context, payload) {
      context.commit("SET_SELECTED_ENTRY_VALUE_OPTIONAL", payload)
    },
    clearSelectedEntryValue(context) {
      context.commit("CLEAR_SELECTED_ENTRY_VALUE")
    },
    setSelectedEntryType(context, payload) {
      context.commit("SET_SELECTED_ENTRY_TYPE", payload)
    },
    clearJobStatus(context) {
      context.commit("CLEAR_JOB_STATUS")
    },
    setCalculationsTime(context, payload) {
      context.commit("SET_CALCULATIONS_TIME", payload)
    },

    //TODO finish with this action. Check if all the status are set.
    async runProcessor({commit, state, rootState}) {

      const {selectedAreaId, selectedService } = rootState.layers
      const { markerLngLat, calculationsTime, selectedEntryType, selectedEntryValue, selectedEntryValueOptional, polygon, jobStatus } = state

      // Set pilot area for selected service
      const area = selectedAreaId
      // Set id of selected service
      const id = selectedService.wps_id;

      // Set lat and lon input values
      var lat = ""
      var lng = ""
      if(markerLngLat) {
        lat = markerLngLat.lat
        lng = markerLngLat.lng
      }

      // Set values from entry form
      //TODO move this into a function

      var lim = ""
      if (selectedEntryType == "lim") {
        lim = selectedEntryValue
      }
      var period = ""
      if (selectedEntryType == "period") {
        period = selectedEntryValue
      }

      // Set source based on lat and lon
      var source = ""
      if (markerLngLat) {
        if (area === "eforie") {
          source = "[" + markerLngLat.lng + "," + markerLngLat.lat + ",0.5]"
        } else if (area === "galway") {
          source = "[" + markerLngLat.lng + "," + markerLngLat.lat + ",-1.0]"
        }
      }

      // Set bounding box in proper format:
      // [[lon_min,lat_min],[lon_max,lat_min],[lon_max,lat_max],[lon_min,lat_max]]
      //TODO move this into a function
      var target = ""
      if (polygon) {
        let lon_max = Math.max(polygon.features[0].geometry.coordinates[0][0][0], polygon.features[0].geometry.coordinates[0][1][0], polygon.features[0].geometry.coordinates[0][2][0], polygon.features[0].geometry.coordinates[0][3][0]).toFixed(10);
        let lon_min = Math.min(polygon.features[0].geometry.coordinates[0][0][0], polygon.features[0].geometry.coordinates[0][1][0], polygon.features[0].geometry.coordinates[0][2][0], polygon.features[0].geometry.coordinates[0][3][0]).toFixed(10);
        let lat_max = Math.max(polygon.features[0].geometry.coordinates[0][0][1], polygon.features[0].geometry.coordinates[0][1][1], polygon.features[0].geometry.coordinates[0][2][1], polygon.features[0].geometry.coordinates[0][3][1]).toFixed(10);
        let lat_min = Math.min(polygon.features[0].geometry.coordinates[0][0][1], polygon.features[0].geometry.coordinates[0][1][1], polygon.features[0].geometry.coordinates[0][2][1], polygon.features[0].geometry.coordinates[0][3][1]).toFixed(10);
        target = "[[" + lon_min + "," + lat_min + "],[" + lon_max + "," + lat_min + "],[" + lon_max + "," + lat_max + "],[" + lon_min + "," + lat_max + "]]"
      }

      const response = await run(calculationsTime, period, id, area, source, target, lat, lng, lim, selectedEntryValue, selectedEntryValueOptional)
      //const response = await run(testtime, id)
      const href = response[0].value.href

      const statusLink = createStatusLink(href)
      commit("SET_STATUS_LINK", statusLink)
      if (statusLink) {
        const status = await getStatus(statusLink)
        commit("SET_JOB_STATUS", status)
      }

      if (jobStatus == "successful") {
        console.log("successful!")
      }
      console.log(period, id, area, source, target, lat, lim)
    },
  }
}