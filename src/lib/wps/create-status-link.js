import getStatusTemplate from "./getStatusTemplate"

export default((url)=>{
  if (!url) {
    return null
  }
  const params = new URL(url).pathname.split("/")

  const jobId = params[5]
  const jobProcess = params[3]
 
  return getStatusTemplate(jobProcess, jobId)
})