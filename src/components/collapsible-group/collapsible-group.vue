<template>
  <v-expansion-panels v-model="open" :disabled="disabled" class="condensed">
    <v-expansion-panel>
      <v-expansion-panel-header
        color="primary"
        ripple
        class="font-weight-bold px-4"
      >
        {{ title }}
        <template v-if="checked" v-slot:actions>
          <v-icon>mdi-check-circle</v-icon>
        </template>
      </v-expansion-panel-header>
      <v-divider></v-divider>
      <v-expansion-panel-content class="mx-n4 my-1">
        <div  v-if="manual" class="px-5 pb-3 flex-grow-1 overflow-y-auto" v-html="content" />
        <slot />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from "vuex";
import { importConfig } from "@/lib/config-utils"

export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
    },
    manual: {
      type: Boolean,
      required: false,
    },
    expand: {
      type: Number,
    },
  },
  data() {
    return {
      open: this.expand,
      checked: false,
      disabledButton: true,
    };
  },
  computed: {
    content() {
      const instructions = 'content/' + this.selectedService.id + '.md';
      return importConfig(instructions)
    },
    ...mapState("wps", ["polygon"]),
    ...mapState("layers", ["selectedService"] ),
    },
  watch: {
    polygon() {
      if (this.polygon) {
        this.disabledButton = false;
      }
    },
  },
};
</script>
<style scoped>
.v-expansion-panels.condensed .v-expansion-panel-header {
  padding-top: 4px;
  padding-bottom: 4px;
  min-height: auto;
}
.v-expansion-panels.condensed
  .v-expansion-panel--active
  .v-expansion-panel-header {
  padding-top: 8px;
  padding-bottom: 8px;
}
.v-expansion-panels.condensed .v-expansion-panel--active:not(:first-child),
.v-expansion-panels.condensed .v-expansion-panel--active + .v-expansion-panel {
  margin-top: 4px;
}

</style>

