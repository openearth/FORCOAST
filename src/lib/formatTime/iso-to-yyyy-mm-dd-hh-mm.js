  import { format } from 'date-fns';

  export default((time) => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    if (!time) {
      return null
    }
    
    return weekday[new Date(time).getDay()] + format(new Date(time), ' yyyy-MM-dd HH:mm')
  })
