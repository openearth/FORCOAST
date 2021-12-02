/* 
 NOTE: Same getCapabilities request has different format in the response (Thredd or Geoserver)
*/
import formatTime from "./format-time";

export default((capabilities, activeLayer) => {

  if (!capabilities) {
    return []
  }
  let allLayers;
  let layer;
  let extent;
  if (capabilities.Layer.Layer.Layer) {
    allLayers = capabilities.Layer.Layer.Layer;
    layer = allLayers.find(
      (layer) => layer.Name._text === activeLayer.id
    );
    extent = layer.Extent._text.split(",");
  } else {
    allLayers = capabilities.Layer.Layer;
    
    layer = allLayers.find(
      (layer) => layer.Name._text === activeLayer.id
    );
    
    extent = layer.Extent[0]._text.split(",");
  }
  let daysExtent = extent.map(formatTime);
  let uniqueDaysExtent = daysExtent.reduce(
    (unique, day) => (unique.includes(day) ? unique : [...unique, day]),
    []
  );
  return uniqueDaysExtent;
      
})