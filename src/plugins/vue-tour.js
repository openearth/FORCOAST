import Vue from 'vue'
import VueTour from 'vue-tour'
import 'vue-tour/dist/vue-tour.css'
export const tourConfig = {
  useKeyboardNavigation: true
}

export const tourSteps = [
  {
    target: '[data-v-step="1"]',
    content: 'Welcome to <strong>BlueEarth Data</strong>!',
    params: {
      placement: 'right'
    }
  }
]

Vue.use(VueTour)
