<template>
  <v-navigation-drawer 
    clipped 
    app 
    permanent 
    width="500">
    <router-view v-on="$listeners" /> 
    <template v-slot:append>
        <v-divider/>
          <v-list dense>
            <v-list-item @click="$emit('toggle-tour')">
              <v-list-item-icon>
                <v-icon color="#008fc5" class="outlined">mdi-flag-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
      </template>
  </v-navigation-drawer>
</template>

<style lang="css" scoped>
.v-icon.outlined {
    border: 1px solid currentColor;
    border-radius:50%;
    height: 32px;
    width: 32px;
}
</style>


