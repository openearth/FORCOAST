<template>
<v-container>
<v-row>
<v-col cols='4'>
 <v-subheader> Select preset </v-subheader>
</v-col>
<v-col cols='8'>    
<dropdown class="my-dropdown-toggle"
          :options="arrayOfobjects"
          :selected="object" 
          v-on:updateOption="setPreset" 
          :placeholder="'Select an Item'"
          :closeOnOutsideClick="false">
</dropdown>
</v-col>
</v-row>
</v-container>
</template>
 
<script>
import dropdown from 'vue-dropdowns';
import { mapActions } from "vuex";

export default {
        props: {
          arrayOfobjects: {
            type: Array,
            required: false,
          },
        },
        data() {
          return {
            object: {
              name: 'Set preset',
              presetType: [],
              presetValue: []
            }
          }
        },
        components: {
            'dropdown': dropdown,
        },
        methods: {
            ...mapActions("wps", ["setSelectedEntryType", "setSelectedEntryValue"]),

            setPreset(payload){
                this.object = payload
                this.setSelectedEntryType(this.object.presetType)
                this.setSelectedEntryValue(this.object.presetValue)
                }
            },
      }
</script> 