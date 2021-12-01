import axios from "axios"

export default function(outputLink) {
  

  return axios({
    method: "get",
    url: outputLink
  }).then((response) => {
		return response.data.output
  })
}

