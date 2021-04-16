<template>
  <div class="pa-4">
    <v-row>
      <v-col>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="startDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="startDate"
                label="Select a start date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="startDate"
              no-title
              scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="menu = false"
            >
                Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.menu.save(startDate)"
            >
                OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :return-value.sync="endDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="endDate"
                label="Select an end date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="endDate"
              no-title
              scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="menu2 = false"
            >
                Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.menu2.save(endDate)"
            >
                OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
    data: () => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
  }), 
}
</script>