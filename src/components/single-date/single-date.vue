<template>
  <div class="pa-4">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Selected date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        scrollable
        min="2021-09-01"
        max="2022-01-01"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    date: "", // TODO take from the services.json
    menu: false,
    menu2: false,
    min: "",
    max: "",
  }),
  props: {
    timeExtent: { // Available timeExtend of data. It is a result of the getCapabilities
      type: Array,
    },
  },
  watch: {
    date() {
      this.setSelectedTime(this.date);
    },
    timeExtent() { 
      this.date = this.timeExtent[0];
      this.min = this.timeExtent[0];
      this.max = this.timeExtent[this.timeExtent.length - 1]
    }
  },
  methods:{
    ...mapActions("layers", ["setSelectedTime"])
  }
};
</script>