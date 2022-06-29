<template>
  <div class="mapName">
  <v-row>
  <v-subheader style="margin:-10px; 
                      padding-left:23px;
                      font-weight: bold"> {{ basemap }} </v-subheader>
  </v-row>
  </div>
</template>

<script>

export default {
  props: {
    basemap: {
      type: String,
      required: true,
    },
  }
};
 </script>

<style scoped>
.mapName {
  position: absolute;
  bottom: 1.9rem;
  right: 0.6rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  outline: 0;
  border: 0;
  z-index: 1;
  height: 30px;
  width: 130px
}
</style>

