import axios from "axios"
import { template } from './template'


export default function(time) {
	const data = template(time)
	return axios({
		method: "post",
		url: `${process.env.VUE_APP_WPS_URL}/forcoast-sm-f2/jobs`,
		data: data,
		headers: { "Content-Type": "application/json; charset=UTF-8'", 'Access-Control-Allow-Origin': '*' },
	}).then(({ data }) => {
		return typeof data === "object" ? data : JSON.parse(data)
	})
}
