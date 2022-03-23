import axios from "axios"
import { template_f2 } from './template_f2'
import { template_a3 } from './template_a3'
import { template_a2 } from './template_a2'
import { template_a1 } from './template_a1'
import { template_r1 } from './template_r1'


export default function(time, period, id, area, source, target, lat, lon, lim, years, mb, me, sl, su, tl, tu, kf, o, kr, d, c_lon, c_lat, r_lon) {
	const data  = (() => {
		if (id == "f2") {
			return template_f2(time, id)
		} else if (id == "a2") {
			return template_a2(time, id, area, source, target)
		} else if (id == "a1") {
			return template_a1(area, time, lat, lon, lim)
		} else if (id == "r1") {
			return template_r1(area, time, period, lon, lat)
		} else if (id == "a3") {
			return template_a3(years, mb, me, sl, su, tl, tu, kf, o, kr, d, c_lon, c_lat, r_lon)
		}
	})();
	return axios({
		method: "post",
		url: `${process.env.VUE_APP_WPS_URL}/forcoast-sm-` + id + `/jobs`,
		data: data,
		headers: { "Content-Type": "application/json; charset=UTF-8'", 'Access-Control-Allow-Origin': '*' },
	}).then(({ data }) => {
		return typeof data === "object" ? data : JSON.parse(data)
	})
}
