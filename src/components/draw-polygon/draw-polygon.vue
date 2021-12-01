<template>
  <div></div>
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
