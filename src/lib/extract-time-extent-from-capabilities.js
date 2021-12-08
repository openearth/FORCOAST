/* 
 NOTE: Same getCapabilities request has different format in the response (Thredd or Geoserver)
*/
import removeSpaceFromTime from "./formatTime/remove-space-from-time";
import { getDates } from "./getdates"

export default((capabilities, activeLayer) => {

  if (!capabilities || !activeLayer) {
    return []
  }
  let allLayers;
  let layer;
  let extent;
  
  if (capabilities.Layer.Layer.Layer) {
    console.log("case Thredds")
    allLayers = capabilities.Layer.Layer.Layer;
    layer = allLayers.find(
      (layer) => layer.Name._text === activeLayer.id
    );
    console.log('layer from GetCapabilities', layer)
    try {
      if (layer.Extent._text.endsWith("P1D")){
        const myArray = layer.Extent._text.split("/");
        const dateStart = Date.parse(myArray[0].trim());
        const dateEnd   = Date.parse(myArray[1]);
        const dates = getDates(dateStart, dateEnd)
        const eventList=[]
        for (var i = 0; i < dates.length; i++) {
          let event = new Date(dates[i])
          eventList.push(event.toISOString());
        }
        extent = eventList
      } else {
        extent = Array.isArray(layer.Extent) ? layer.Extent[1]._text.split(",") : layer.Extent._text.split(",");
      }
    }catch(error){
      console.log("Something went wrong when tried to retrieve the timeExtent from the capabilities")
    } 
    
  } else {
    console.log("case Geoserver")
    allLayers = capabilities.Layer.Layer;
    
    layer = allLayers.find(
      (layer) => layer.Name._text === activeLayer.id
    );
    
    try{
      extent =  Array.isArray(layer.Extent) ? layer.Extent[0]._text.split(",") : layer.Extent._text.split(",") ;
    }catch(error){
      console.log("Something went wrong when tried to retrieve the timeExtent from the capabilities")
    }
  }
  if (!extent){
    return []
  }
  const formattedExtent = extent.map(removeSpaceFromTime)
  return formattedExtent; 
})