import Vue from 'vue'
import VueTour from 'vue-tour'
import 'vue-tour/dist/vue-tour.css'
export const tourConfig = {
  useKeyboardNavigation: true
}

Vue.use(VueTour)

export let tourStepCount = null

export const tourSteps = [
  {
    target: '[data-v-step="1"]',
    content: 'Welcome to <strong>FORCOAST</strong> platform!',
    params: {
      placement: 'bottom'
    },
    before: function() {
      tourStepCount = 1
    }
  },
  {
    target: '[data-v-step="2"]',
    content: 'Select a pilot area and service here',
    params: {
      placement: 'bottom'
    },
    before: function() {
      tourStepCount = 2
    }
  },
  {
    target: '[data-v-step="3"]',
    content: 'Background information about the service',
    params: {
      placement: 'right'
    },
    before: function() {
      tourStepCount = 3
    }
  },
  {
    target: '[data-v-step="4"]',
    content: 'View spatial data layers here',
    params: {
      placement: 'right'
    },
    before: function() {
      tourStepCount = 4
    }
  },
  {
    target: '[data-v-step="5"]',
    content: 'Run demo services here',
    params: {
      placement: 'right'
    },
    before: function() {
      tourStepCount = 5
    }
  }
]


