<template>
  <v-expansion-panels v-model="open" class="mb-4">
    <v-expansion-panel>
      <v-expansion-panel-header 
        color="primary"
        hide-actions
        class="font-weight-bold px-4">
        {{ title }}</v-expansion-panel-header>
        <v-divider></v-divider>
      <v-expansion-panel-content class="mx-n6">
        <slot />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  data() { 
      return { 
        open:0,
      }
  }
};
/* 
<div id="app">
  <v-app id="inspire">
    <div>
     
      <!--make disabled a prop. emit from one component if the other one should become enabled -->
      <v-expansion-panels
        v-model="panel"
        :disabled="true"
      >
        <v-expansion-panel>
          <v-expansion-panel-header
           hide-actions
           >Panel 1</v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels
        v-model="panel2"
        :disabled="false"
      >
      <v-expansion-panel>
          <v-expansion-panel-header
            color="primary"
            disable-icon-rotate
           >Panel 2
             <template v-slot:actions>
              <v-icon>mdi-check-circle</v-icon>
             </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-app>
</div>
 */
</script>
