import  moment from 'moment'; 
import { COLORS } from '../GlobalStyles.js'


export const colors = {
    Yoga: {
        color: COLORS.yoga,
        colorLight: COLORS.yogaLight,
        colorDark: COLORS.yogaDark
    },
    Meditation: {
        color: COLORS.meditation,
        colorLight: COLORS.meditationLight,
        colorDark: COLORS.meditationDark
    },
    Accessory: {
        color: COLORS.accessory,
        colorLight: COLORS.accessoryLight,
        colorDark: COLORS.accessoryDark
    },
    Primary: {
        color: COLORS.primary,
        colorLight: COLORS.primaryLight,
        colorDark: COLORS.primaryDark
    },   
};

export const isOpen = (hours)=>{
    const date = new Date();
    const day = moment(date).format('dddd').toLowerCase();
    const todayHourFormat =  moment(date).format('HH:mm'); 
    const todayHour = moment(todayHourFormat,'HH:mm');
    const startHour = moment(hours[day].start, 'HH:mm');  
    const endHour = moment(hours[day].end, 'HH:mm');
  
    if (hours[day].type === "Open" && todayHour.isBetween(startHour, endHour, 'minutes', '[]'))
        return true;
    return false;
};  

export const currentOpenHours = (hours)=>{
    const date = new Date();
    const day = moment(date).format('dddd').toLowerCase();
    return (hours[day].type === "Open" ? `${hours[day].start} - ${hours[day].end}` : "");
}
