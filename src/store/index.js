import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCategory: null,
    selectedService:null,
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
    }

  }

}); 