import axios from "axios"
import { template_f2 } from './template_f2'
import { template_a4 } from './template_a4'
import { template_a3 } from './template_a3'
import { template_a2 } from './template_a2'
import { template_a1 } from './template_a1'
import { template_r1 } from './template_r1'

export default function(date, hours, period, id, area, source, target, lat, lon, lim, selectedEntryValue, selectedEntryValueOptional) {
	
	const data  = (() => {
		if (id == "f2") {
			return template_f2(date, id)
		} else if (id == "a2") {
			return template_a2(date, id, area, source, target)
		} else if (id == "a1") {
			return template_a1(area, date, lat, lon, lim)
		} else if (id == "r1") {
			const dateTime = date + "T" + hours + ":00"
			return template_r1(area, dateTime, period, lon, lat)
		} else if (id == "a3") {
			if (target == "") {
				// default target for entire area, if no specific one is prescribed
				target = "[[8.1800000000,56.4500000000],[9.5000000000,56.4500000000],[9.5000000000,57.0500000000],[8.1800000000,57.0500000000]]"
			}
			return template_a3(selectedEntryValue[0], selectedEntryValue[1], selectedEntryValue[2], selectedEntryValue[3], selectedEntryValue[4], selectedEntryValue[5], selectedEntryValue[6], selectedEntryValue[7], selectedEntryValueOptional[0], selectedEntryValueOptional[1], selectedEntryValueOptional[2], selectedEntryValueOptional[3], target)
		} else if (id == "a4") {
			if (selectedEntryValue[1] == undefined) {
				selectedEntryValue[1] = "x"
			}
			if (selectedEntryValue[2] == undefined || selectedEntryValue[3] == undefined){
				selectedEntryValue[2] = "x"
				selectedEntryValue[3] = "x"
			}
			return template_a4(selectedEntryValue[0], selectedEntryValue[1], selectedEntryValue[2], selectedEntryValue[3], selectedEntryValue[4], selectedEntryValue[5], selectedEntryValue[6])
							//(ptm, tt, gdt, ttcs, pldmin, pldmax, sd)
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
