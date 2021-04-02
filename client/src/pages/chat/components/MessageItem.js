import React from 'react';
import styled from 'styled-components';
import  moment from 'moment'; 
import { COLORS} from '../../../GlobalStyles';


const MessageItem = ({reference = null, sender})=>{

    const handleClick = (ev)=>{

        ev.preventDefault();
    }

    return (
        <Wrapper ref={reference}>
            <ProfilImage sender={sender} src={'/user.svg'} atl="userProfile"/> 
            <TextWrapper sender={sender} onClick={handleClick}>
                <DatePar sender={sender}>{moment(new Date()).fromNow() }</DatePar>            
                <Message sender={sender} >Salut ce video est magnifique</Message>
            </TextWrapper>
        </Wrapper >
    )
};


const Wrapper = styled.div` 
position: relative;
    background: none;
    border: 1px solid #F8F8F8;
    border-top: none;  
    padding: 15px 0; 
    border-radius: 10px;
    display: flex;
    align-items: flex-start;   
    font-size: 14px;
    box-sizing: border-box;
    cursor: pointer;   
`;


const ProfilImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 7px;
    order: ${(p)=>p.sender ? 1 : 0};
   
`; 

const TextWrapper = styled.div`
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    background: ${(p)=>(p.sender ? '#0084FF' : '#E4E6EB')};
    border-radius: 15px;
    padding: 5px 10px;
    width: fit-content;
    margin: ${(p)=>(p.sender ? '5px 0 0 auto' : '5px auto 0 0')};   

     & p {
         margin: 2px;       
    }
   

`;
const Message = styled.p`   
    width: fit-content;
    font-size: 13px;
    color: ${(p)=>(p.sender ? 'white' : 'black')};
`;

const DatePar = styled.p`
    position: absolute;
    bottom: -5px;
    right: ${(p)=>(p.sender ? '6px' : 'none')};
    left: ${(p)=>(p.sender ? 'none' : '6px')};;
    color: grey;
    font-size: 10px;

`;


export default MessageItem; 