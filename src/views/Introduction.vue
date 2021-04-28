<template>
  <div class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">Home</h2>
      <v-divider class="mt-4 mb-4" />
    </div>
    <div v-html="content" class="introduction" />
  </div>
</template>

<script>
import { importConfig } from "@/lib/config-utils";

export default {
  computed: {
    content() {
      return importConfig("content/introduction.md");
    },
  },
};
</script>
<style>
.v-application ul,
.v-application ol {
  margin-bottom: 16px;
}
</style>