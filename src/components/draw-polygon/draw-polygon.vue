<template>
  <div class="pa-4">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$emit("show-draw-polygon", true);
  },
  destroyed() {
    this.$emit("show-draw-polygon", false);
  },
};
</script>
