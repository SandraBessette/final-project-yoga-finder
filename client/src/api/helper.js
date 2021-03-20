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
    //in the database.... make string with hours of the day not date!
    const date = new Date();
    const day = moment(date).format('dddd').toLowerCase();
    const todayHourFormat =  moment(date).format('HH:mm');
    const startHourFormat = moment(hours[day].start).format('HH:mm');  
    const endHourFormat = moment(hours[day].end).format('HH:mm');    
    const todayHour = moment(todayHourFormat,'HH:mm');
    const startHour = moment(startHourFormat, 'HH:mm');  
    const endHour = moment(endHourFormat, 'HH:mm');      
    //add later data.hours[day].type === "open" &&
  
    if(todayHour.isBetween(startHour, endHour, 'minutes', '[]'))
        return true;
    return false;
};  

export const currentOpenHours = (hours)=>{
    const date = new Date();
    const day = moment(date).format('dddd').toLowerCase();
    const startHourFormat = moment(hours[day].start).format('HH:mm'); 
    const endHourFormat = moment(hours[day].end).format('HH:mm');     
    return `${startHourFormat} - ${endHourFormat}`
}