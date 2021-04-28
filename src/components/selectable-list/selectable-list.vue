<template>
  <v-list>
    <v-list-item-group v-model="index" color="primary">
      <v-list-item v-for="value in values" :key="value">
        <v-list-item-content>
          {{ value }}
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      index: null,
    };
  },
};
</script>