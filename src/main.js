import Vue from "vue"
import store from "./store"
import "./plugins/composition-api"
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import "./plugins/vue2MapboxGL"
import "./plugins/VueHtmlToPaper"
import './plugins/vue-tour'

import '@/css/tour.css'

Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	store,
	render: h => h(App)
}).$mount("#app")
