<template>
  <div v-if="selectedService" class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">{{ selectedCategory }}</h2>
      <!-- <v-divider class="mt-4 mb-4" /> -->
    </div>
    <div>
      <service-viewer
        :service="selectedService"
      ></service-viewer>
    </div>
  </div>
  <div v-else class="pa-4 home d-flex flex-column" >
    <div>
      <h2 class="h2">{{ selectedCategory }}</h2>
      <v-divider class="mt-4 mb-4" />
      <p>Select a service from the dropdown list </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import serviceViewer from '../components/service-viewer/service-viewer.vue';

export default {
  components: { serviceViewer },
  computed: {
    ...mapState({
      selectedCategory: state => state.selectedCategory,
      selectedService: state => state.selectedService

    })
  },
}

</script>
