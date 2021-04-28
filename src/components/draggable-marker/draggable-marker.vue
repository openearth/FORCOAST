<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$emit("show-draggable-marker", true);
  },
  destroyed() {
    this.$emit("show-draggable-marker", false);
  },
};
</script>
