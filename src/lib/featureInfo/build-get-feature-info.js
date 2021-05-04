export const getFeatureInfo = ({ url, layer, bbox, time }) => 
  `${url}?service=WMS&version=1.1.1&request=GetFeatureInfo&crs=EPSG:4326&transparent=true&styles&
  &bbox=${bbox}&x=50&y=50&feature_count=1&layers=${layer}&query_layers=${layer}&time=${time}&width=101&height=101&format=image/png&info_format=application/json`;
