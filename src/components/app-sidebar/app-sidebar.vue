<template>
  <v-navigation-drawer 
    clipped 
    app 
    permanent 
    width="500">
    <router-view v-on="$listeners" /> 
  </v-navigation-drawer>
</template>
