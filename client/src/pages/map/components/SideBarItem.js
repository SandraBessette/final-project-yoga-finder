import React from 'react';
import styled from 'styled-components';
import  moment from 'moment'; 
import { COLORS } from '../../../GlobalStyles';


const SideBarItem = ({data})=>{
    const getColor = ()=>{
        let colorBorder = COLORS.yoga;
            if( data.type === 'Meditation')
        colorBorder = COLORS.meditation;
            if (data.type === 'Accessory')
        colorBorder = COLORS.accessory;
        return colorBorder;
    };
    
    const isOpen = ()=>{
        //in the database.... make string with hours of the day not date!
        const date = new Date();
        const day = moment(date).format('dddd').toLowerCase();
        const todayHourFormat =  moment(date).format('HH:mm');
        const startHourFormat = moment(data.hours[day].start).format('HH:mm');  
        const endHourFormat = moment(data.hours[day].end).format('HH:mm');    
        const todayHour = moment(todayHourFormat,'HH:mm');
        const startHour = moment(startHourFormat, 'HH:mm');  
        const endHour = moment(endHourFormat, 'HH:mm');      
        //add later data.hours[day].type === "open" &&
      
        if(todayHour.isBetween(startHour, endHour, 'minutes', '[]'))
            return true;
        return false;
    };    

    return(
        <Wrapper colorBorder={getColor()}>
            <Image src={data.image[0]} alt="yogaImage" colorBorder={getColor()} />
            <ContentWapper>
                <Title>{data.name}</Title>
                <Content>{data.ratingCount === 0 ? 'No rating': '⭐⭐⭐⭐⭐'}</Content>
                <MiddleContent>               
                <Content>{`${data.address.street} ${data.address.city}`}</Content>
                <Content>{data.phone} - <Hour isOpen={isOpen()}>{isOpen() ? 'Open': 'Close'}</Hour></Content>
                </MiddleContent>
                <Dist>{data.dist?.calculated && data.dist.calculated.toFixed(2) + ' km'}</Dist>
            </ContentWapper>
        </Wrapper>
    )

};
//{`${data.address.street} ${data.address.city} ${data.address.zip} ${data.address.province} ${data.address.country}`}
const Wrapper = styled.div`
    display: flex;
    border-radius: 5px;
    border: ${(p)=> ('1px solid' + p.colorBorder) };
   // border-top: ${(p)=> ('4px solid' + p.colorBorder) }; 
    padding: 0; 
    min-height: 125px;
    margin: 5px 0;
    `;


const Image = styled.img`
    width: 125px;
    height: auto;  
    border-bottom: ${(p)=> ('4px solid' + p.colorBorder) };  
    object-fit: cover;
`;

const ContentWapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;   
    width: 100%;
    padding: 10px;
`;

const Title = styled.p`
    font-size: 12px;
    font-weight: 600;
    margin: 0;
`;

const MiddleContent = styled.div`
    margin: auto 0;
`;

const Content = styled.p`
    font-size: 11px;
    margin: 2px;
`;

const Hour = styled.span`
    color: ${(p=>p.isOpen ? 'green' : 'red')};
    font-weight: 600;
`;

const Dist = styled.p`
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 10px;
    color: gray;    
    padding: 0;
    margin: 0;    
`;
export default SideBarItem;