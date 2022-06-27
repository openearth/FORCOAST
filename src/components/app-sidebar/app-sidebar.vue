<template>
  <v-navigation-drawer 
    clipped 
    app 
    permanent 
    width="500">
    <router-view v-on="$listeners" /> 
    <template v-slot:append>
        <v-divider/>
        <v-container>
          <v-icon color="#008fc5" class="outlined" @click="goToTour">mdi-flag-outline</v-icon>
          &nbsp;
          <v-icon color="#008fc5" class="outlined" @click="dialog = true">mdi-database</v-icon>
          <monitor-window
            v-if="dialog"
            @close-dialog="dialog = false"
          ></monitor-window>
        </v-container>
      </template>
  </v-navigation-drawer>
</template>

<script>

import monitorWindow from "@/components/monitor-window";

export default {
  components: {
    monitorWindow
  },
  data() { 
    return {
      dialog: false
    }
  },
  methods:{
    goToTour() {
      if (window.location.href == "https://forcoast.netlify.app" || window.location.href == "http://localhost:8080") {
      this.$router.push('sector=wild_fishery&service=suitable_fishing_areas&area=eforie')
      }
      this.$emit('toggle-tour')
    }
  }
};
</script>

<style lang="css" scoped>
.v-icon.outlined {
    border: 1px solid currentColor;
    border-radius:50%;
    height: 26px;
    width: 26px;
}
</style>


