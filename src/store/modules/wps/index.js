import run from "@/lib/wps/runProcessor"
import getStatus  from "@/lib/wps/getStatus"
import createStatusLink from "@/lib/wps/create-status-link"

export default {
  namespaced: true,

  state: {
    polygon: null,
    markerLngLat: {},
    jobStatus: null,
    statusLink: null,
    selectedEntryValue: null,
    selectedEntryType: null,
    selectedEntryValueOptional: null,
    selectedEntryTypeOptional: null,
    calculationsTime: null

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
    SET_SELECTED_ENTRY_TYPE_OPTIONAL(state, entryTypeOptional) {
      state.selectedEntryTypeOptional = entryTypeOptional
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
    setSelectedEntryTypeOptional(context, payload) {
      context.commit("SET_SELECTED_ENTRY_TYPE_OPTIONAL", payload)
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
      const { markerLngLat, calculationsTime, selectedEntryType, selectedEntryValue, selectedEntryTypeOptional, selectedEntryValueOptional, polygon, jobStatus } = state

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
      // Variables of A3
      var years = ""
      if (selectedEntryType[0] == "years"){
        years = selectedEntryValue[0]
      }
      var mb = ""
      if (selectedEntryType[1] == "mb"){
        mb = selectedEntryValue[1]
      }
      var me = ""
      if (selectedEntryType[2] == "me"){
        me = selectedEntryValue[2]
      }
      var sl = ""
      if (selectedEntryType[3] == "sl"){
        sl = selectedEntryValue[3]
      }
      var su = ""
      if (selectedEntryType[4] == "su"){
        su = selectedEntryValue[4]
      }
      var tl = ""
      if (selectedEntryType[5] == "tl"){
        tl = selectedEntryValue[5]
      }
      var tu = ""
      if (selectedEntryType[6] == "tu"){
        tu = selectedEntryValue[6]
      }

     //Optional variables of A3
      var kf = "0.75"
      var o = "4.5"
      var kr = "0.5"
      var d = "-4"
      
      try {
        if (selectedEntryTypeOptional[0] == "kf" && selectedEntryValueOptional[0] != ""){
          kf = selectedEntryValueOptional[0]
        } 
        if (selectedEntryTypeOptional[1] == "o" && selectedEntryValueOptional[1] != ""){
          o = selectedEntryValueOptional[1]
        }
        if (selectedEntryTypeOptional[2] == "kr" && selectedEntryValueOptional[2] != ""){
          kr = selectedEntryValueOptional[2]
        } 
        if (selectedEntryTypeOptional[3] == "d" && selectedEntryValueOptional[3] != ""){
          d = selectedEntryValueOptional[3]
        } 
      } catch {
        //do nothing
      }

      // Set source based on lat and lon
      var source = ""
      if (markerLngLat) {
      source = "[" + markerLngLat.lng + "," + markerLngLat.lat + ", 0.5]"
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
        // console.log(lon_max)
        // console.log(lon_min)
        // console.log(lat_max)
        // console.log(lat_min)
        target = "[[" + lon_min + "," + lat_min + "],[" + lon_max + "," + lat_min + "],[" + lon_max + "," + lat_max + "],[" + lon_min + "," + lat_max + "]]"
      } else if (id == "a3") {
        target = "[[8.1800000000,56.4500000000],[9.5000000000,56.4500000000],[9.5000000000,57.0500000000],[8.1800000000,57.0500000000]]"
      }

      const response = await run(calculationsTime, period, id, area, source, target, lat, lng, lim, years, mb, me, sl, su, tl, tu, kf, o, kr, d)
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