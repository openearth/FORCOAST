  import sliceTimestamp from "./slice-timestamp";
  

  export default((extent)=>{
  
  if (!extent.length) {
    return []
  }

  let daysExtent = extent.map(sliceTimestamp);
  
  let uniqueDaysExtent = daysExtent.reduce(
    (unique, day) => (unique.includes(day) ? unique : [...unique, day]),
    []
  );

  return uniqueDaysExtent
  })
  
