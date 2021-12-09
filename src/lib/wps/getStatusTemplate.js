

const wpsUrl = process.env.VUE_APP_WPS_URL

export default ((jobProcess, jobId)=>{
  console.log(jobProcess, jobId, 'in getStat')
  return `${wpsUrl}/${jobProcess}/jobs/${jobId}`;
})  
  