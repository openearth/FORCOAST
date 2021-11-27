import buildGeoserverUrl from "./build-geoserver-url"
import wms from "./wms"

export default ({ url, id, layer, time, styles="", colorscalerange, paint={} }) => {
	const tile = buildGeoserverUrl({
		url,
		service: "WMS",
		request: "GetMap",
		layers: layer,
		styles: styles,
		width: 256,
		height: 256,
		crs: "EPSG:3857",
		transparent: true,
		version: "1.3.0",
		COLORSCALERANGE: colorscalerange,
    time,
		bbox: "{bbox-epsg-3857}",
		format: "image/png",
		encode: false
	})

	return wms({
		id,
		layer,
    request: tile, // added in order to realize both changes of id and time.
		tiles: [ tile ],
		tileSize: 256,
		paint
	})
}
