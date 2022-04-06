import extractTimeExtentFromCapabilities from  "@/lib/extract-time-extent-from-capabilities"
import buildWmsLayer from "@/lib/build-wms-layer";
import getWMSCapabilities from "@/lib/getWmsCapabilities";

export default {
  namespaced: true,
  state: {
		selectedCategory: null,
    selectedArea: null,
    selectedAreaId: null,
		selectedService:null,
		selectedAreaBBox: null,
    selectedTime: null,
    iconCategory: null,
    timeSpan: [], //TODO service-viewer data() timeSpan has replaced the state. Check if needed as state
    activeLayers: [],
    capabilities: null,
	},
  getters: {
    // always make the getCapabilities with the last selected Layer.
    selectedLayer(state) {
      const { activeLayers } = state
      if (!activeLayers.length) {
        return null
      }
      return activeLayers[activeLayers.length - 1] 
    },
    timeExtent(state, getters) {
      const { capabilities } = state
      const { selectedLayer } = getters
      if (!capabilities & !selectedLayer) {
        return []
      }
      return extractTimeExtentFromCapabilities(capabilities, selectedLayer)
    },
    layerTimestamp(state, getters) {
      const { selectedTime, capabilities } = state
      const { timeExtent } = getters
      //There are layers that have no timeExtent in the capabilities. For that case the time will be empty string
      if (capabilities && !timeExtent.length) {
        return ' '
      }
      if (!selectedTime) {
        return timeExtent[timeExtent.length - 1]
      }
      
      return selectedTime
    },
        /* WMS layer of selected layer */
    wmsLayer(state, getters) {
      const { selectedLayer, timeExtent, layerTimestamp } = getters
      if (!selectedLayer || !layerTimestamp) {
        return null
      }
      const layer = {
        ...selectedLayer,
        time: layerTimestamp
      }
    
      return buildWmsLayer(layer) 
    },
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
    SET_SELECTED_TIME(state, time) {
      state.selectedTime = time
    },
    CLEAR_SELECTED_TIME(state, time) {
      state.selectedTime = null
    },
    SET_TIME_SPAN(state, timespan) {
      state.timeSpan = timespan
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
      state.activeLayers = []
    },
    SET_CAPABILITIES(state, capabilities) {
      state.capabilities = capabilities
    },
    CLEAR_CAPABILITIES(state) {
      state.capabilities = null
    },
	},
  actions: {
    setCategory(context, payload) {
      context.commit("SET_CATEGORY", payload)
    },
    setIconCategory(context, payload) {
      context.commit("SET_ICON_CATEGORY", payload)
    },
    setArea(context, payload) {
      context.commit("SET_AREA", payload)
    },
    setAreaId(context, payload) {
      context.commit("SET_AREA_ID", payload)
    },
    setService(context, payload) {
      context.commit("SET_SERVICE", payload)
    },
    setSelectedAreaBbox(context, payload) {
      context.commit("SET_SELECTED_AREA_BBOX", payload)
    },
    setSelectedTime(context, payload) {
      context.commit("SET_SELECTED_TIME", payload)
    },
    setTimeSpan(context, payload) {
      context.commit("SET_TIME_SPAN", payload)
    },
    setActiveLayers(context, payload) {
      context.commit("SET_ACTIVE_LAYERS", payload)
    },
    async getCapabilities(context) {
      const { selectedLayer } = context.getters
      if (!selectedLayer) {
        return null
      }
      try {
        const response = await getWMSCapabilities({
          url: selectedLayer.url,
        });
        const capabilities = response.WMT_MS_Capabilities.Capability;
        context.commit("SET_CAPABILITIES", capabilities)
      } catch (error) {
        console.log("error:", error);
      }
    },

    clearTimeExtent(context) {
      context.commit("CLEAR_TIME_EXTENT")
    },
    clearSelectedTime(context) {
      context.commit("CLEAR_SELECTED_TIME")
    },
    clearCapabilities(context) {
      context.commit("CLEAR_CAPABILITIES")
    },
    clearSelectedService(context) {
      context.commit("CLEAR_SELECTED_SERVICE")
    },
    clearActiveLayers(context) {
      context.commit("CLEAR_ACTIVE_LAYERS")
    }
  }
}