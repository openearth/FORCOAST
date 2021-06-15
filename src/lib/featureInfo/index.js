import axios from "axios"
import { getFeatureInfo } from "./build-get-feature-info"

export default function({ url, layer, bbox, time }) {
  
	const request = getFeatureInfo({ url, layer, bbox, time })
  
  return axios({
    method: "get",
    url: request
  }).then(({ data }) => {
		return typeof data === "object" ? data : JSON.parse(data)
	})
  
}