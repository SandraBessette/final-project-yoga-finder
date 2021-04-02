import React, {useState } from 'react';
import styled from 'styled-components';
import  moment from 'moment'; 
import { COLORS} from '../../../GlobalStyles';



const ChatListItem = ()=>{
  

    const handleClick = (ev)=>{
        ev.preventDefault();
       // setSelected(prev=>!prev);
    }

    return (
        <Wrapper  >
            <ProfilImage src={'/user.svg'} atl="userProfile"/> 
            <TextWrapper onClick={handleClick}>
                <DatePar>{moment(new Date()).fromNow() }</DatePar>
                <p>Louise Vezina</p>
                <MessageWrapper>
                <Message>Salut ce video est magnifique, j'aimerais pouvoir faire cela moi aussi</Message>
                <Unread>5</Unread>
                </MessageWrapper>
            </TextWrapper>
        </Wrapper >
    )
};


const Wrapper = styled.button` 
    background: ${(p)=>p.selected ?COLORS.primaryLight : 'none'};
    border: 1px solid #F8F8F8;
    border-top: none;  
    padding: 7px; 
    border-radius: 10px;
    display: flex;
    align-items: center;   
    font-size: 14px;
    box-sizing: border-box; ;
    cursor: pointer;

    &:hover {
        background-color: ${COLORS.primaryLight};
    }
 
   
`;


const ProfilImage = styled.img`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 10px;
  // margin: 0 15px 15px 0;
`;

const TextWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
   // width: 100%;
  // //display: flex;
  // flex-direction: column;
  // flex: 1;
 
  box-sizing: border-box;
     & p {
         margin: 2px;
     }

`;
const Message = styled.p`
   overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
     max-width: 220px;

    font-size: 11px;
    color: grey; 
`;

const DatePar = styled.p`
    position: absolute;
    top: 0;
    right: 0;
    color: grey;
    font-size: 10px;
`;

const Unread = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${COLORS.primary};
    color: white;
    font-size: 9px;
    font-weight: 600;
`;

const MessageWrapper = styled.div`
    display: flex;
`;


export default ChatListItem; 