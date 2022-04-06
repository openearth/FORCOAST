import Vue from "vue"
import store from "./store"
import "./plugins/composition-api"
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import "./plugins/vue2MapboxGL"
import "./plugins/VueHtmlToPaper"
import './plugins/vue-tour'
import VueGtag from 'vue-gtag'

import '@/css/tour.css'

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: { id: 'G-H2Y26MW43B' }
}, router)


new Vue({
	router,
	vuetify,
	store,
	render: h => h(App)
}).$mount("#app")
