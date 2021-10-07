import axios from "axios"

export default function(statusLink) {
  

  return axios({
    method: "get",
    url: statusLink
  }).then((response) => {
		return response.data.status
  })
}

