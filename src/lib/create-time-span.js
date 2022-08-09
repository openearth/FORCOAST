import { addDays, addHours, differenceInDays, differenceInHours } from 'date-fns';
import { mapState } from 'vuex';

export default function (startDate, endDate, interval) {
    if (interval == "hourly") {
        const hours = differenceInHours(endDate, startDate)
        return [...Array(hours+1).keys()].map((i) => addHours(startDate, i));
    } else {
        const days = differenceInDays(endDate, startDate);
        return [...Array(days+1).keys()].map((i) => addDays(startDate, i));
    }
}