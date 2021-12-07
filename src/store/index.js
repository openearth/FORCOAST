import Vue from "vue"
import Vuex from "vuex"


import wps from "./modules/wps"
import layers from "./modules/layers"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    wps, 
    layers
  },
}) 
