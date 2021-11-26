import axios from "axios"
import { template_f2 } from './template_f2'
import { template_a2 } from './template_a2'


export default function(time, id, area, source, target) {
	//if (id == "f2") {
	//	const data = template_f2(time, id)
	//}
	const data  = (() => {
		if (id == "f2") {
			return template_f2(time, id)
		} else if (id == "a2") {
			return template_a2(time, id, area, source, target)
		}
	})();
	//if (id == "a2") {
	//	const data = template_a2(time, id)
	//}
	return axios({
		method: "post",
		url: `${process.env.VUE_APP_WPS_URL}/forcoast-sm-` + id + `/jobs`,
		data: data,
		headers: { "Content-Type": "application/json; charset=UTF-8'", 'Access-Control-Allow-Origin': '*' },
	}).then(({ data }) => {
		return typeof data === "object" ? data : JSON.parse(data)
	})
}
