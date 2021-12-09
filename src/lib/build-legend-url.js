import buildGeoserverUrl from "./build-geoserver-url"

export default ({ layer, url, scale, colorscalerange, styles, width = 40, height = 60 }) => buildGeoserverUrl({
	request: "GetLegendGraphic",
	service: "WMS",
	format: "image/png",
	width,
	height,
	url,
	layer,
	scale,
	colorscalerange,
/* 	palette: "sst_36" */ //TODO @Daniel do we need that?
})
