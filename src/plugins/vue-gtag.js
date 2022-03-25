import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: {
    id: 'G-H2Y26MW43B',
    anonymize_ip: true,
    params: {
      send_page_view: true
    }
  }
})
