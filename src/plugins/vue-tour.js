import Vue from 'vue'
import VueTour from 'vue-tour'
import 'vue-tour/dist/vue-tour.css'
export const tourConfig = {
  useKeyboardNavigation: true
}

export const tourSteps = [
  {
    target: '[data-v-step="1"]',
    content: 'Welcome to <strong>FORCOAST</strong> platform!',
    params: {
      placement: 'bottom'
    }
  },
  {
    target: '[data-v-step="2"]',
    content: 'Select a pilot area and service here',
    params: {
      placement: 'bottom'
    }
  },
  {
    target: '[data-v-step="3"]',
    content: 'Background information about the service',
    params: {
      placement: 'right'
    }
  },
  {
    target: '[data-v-step="4"]',
    content: 'View spatial data layers here',
    params: {
      placement: 'right'
    }
  },
  {
    target: '[data-v-step="5"]',
    content: 'Run demo services here',
    params: {
      placement: 'right'
    }
  }
]

Vue.use(VueTour)
