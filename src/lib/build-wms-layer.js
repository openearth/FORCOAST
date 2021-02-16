import buildGeoserverUrl from './build-geoserver-url';
import wms from './wms';

export default ({ url, id, layer, styles='', paint={} }) => {
  const tile = buildGeoserverUrl({
    url,
    service: 'WMS',
    request: 'GetMap',
    layers: layer,
    styles,
    width: 2048,
    height: 2048,
    srs: 'EPSG:4326',
    version: '1.3.0',
    crs: 'CRS:84',
    transparent: true,
    bbox: '-9.648599624633789,38.161399841308594,-8.657400131225586,38.956600189208984',
    format: 'image/png',
    encode: false
  });

  return wms({
    id,
    layer,
    tiles: [ tile ],
    tileSize: 256,
    paint
  });
};
