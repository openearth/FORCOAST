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
        max="2022-06-01"
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
    date: "", 
    menu: false,
    min: "",
    max: "",
  }),
  watch: {
    date() {
      console.log('date',this.date)
      this.setCalculationsTime(this.date);
    },
  },
  methods:{
    ...mapActions("wps", ["setCalculationsTime"])
  }
};
</script>