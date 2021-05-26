import axios from "axios"
import { describeCoverage } from "./build-get-wms-capabilities"

const convert = require("xml-js");

export default function({ url }) {
  
	const request = describeCoverage({ url })

  return axios({
    method: "get",
    url: request
  }).then(({ data }) => {
		return typeof data === "object" ? data : JSON.parse(
      convert.xml2json(data, { compact: true, spaces: 2 }))
	})
  
}