import { format } from 'date-fns';

export default((time) => {
  if (!time) {
    return null
  }
  
  return format(new Date(time), 'MMM yyyy')
})
