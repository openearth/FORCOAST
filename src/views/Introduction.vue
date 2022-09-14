<template>
  <div class="pa-4 home d-flex flex-column">
    <h2 class="h2">Home</h2>
    <table height="100%">
        <tr>
            <td>
                <v-divider class="mt-4 mb-4" />
            </td>
        </tr>
        <tr style="vertical-align:top">
            <td>
                <div v-html="content" class="introduction" />
            </td>
        </tr>
        <tr height="20">
            <td>
              <img :src="require(`@/assets/European_Commission.svg_-300x208.png`)" height="100" >
              <p>This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 870465.</p>
            </td>
        </tr>
    </table>
    <v-divider class="mt-4 mb-4" /> 
    <div> <b>Useful Links:</b><br/>
      <a href="https://forcoast.eu" target="_blank">FORCOAST Website</a><br/>
      <a href="https://forcoast.eu/home/privacy-policy/" target="_blank">Privacy Policies</a><br/>
      <a href="https://forcoast.eu/home/disclaimer/" target="_blank">Disclaimer</a><br/>
      <a href="https://forcoast.eu/home/general-terms-and-conditions/" target="_blank">General Terms and Conditions</a><br/>
      <a href="https://forcoast.eu/home/cookies-policies/" target="_blank">Cookies Policies</a>
    </div>
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