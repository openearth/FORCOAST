<template>
  <v-dialog
    scrollable
    persistent
    v-model="cookies"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :max-width="640"
  >
    <v-card class="d-flex flex-column" style="max-height: 100%;overflow:hidden">
      <v-card-title class="pa-5">
        <v-toolbar-title>FORCOAST Platform (beta) User Agreement</v-toolbar-title>
      </v-card-title>

      <div class="px-5 flex-grow-1 overflow-y-auto" v-html="content" />
      <div class="pa-2" style="border-top-style:groove; text-align:center"><b>You have already accepted the "User Agreement"</b></div>
      <v-btn color="primary" @click="closeCookies">Close</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { importConfig } from "@/lib/config-utils"

export default {
	data: () => ({
		cookies: true,
		acceptedConditions: false,
		acceptedCookies: false,
	}),
	computed: {
		content() {
			return importConfig("content/user-agreements.md")
		},
	},
	methods: {
    closeCookies() {
      this.cookies = false;
      this.$emit("close-cookies", false);
    },
	},
}
</script>
