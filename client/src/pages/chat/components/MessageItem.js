import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import  moment from 'moment'; 
import { reduceCountInfo } from '../../../store/reducers/chat/actions';


const MessageItem = ({reference = null, sender, message, unreadStyle})=>{
    const { authData } = useSelector((state)=>state.auth);  
    const dispatch = useDispatch();

    useEffect(()=>{
     
        if ((!message.read && !sender) || (!message.read && message.sender._id === message.receiver)){
          
            fetch(`/chat/message/read/${message._id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authData?.token}`
                }               
            })
            .then((res) => res.json())
            .then((json) => {
                const { status} = json;            
                if (status === 201) {                  
                    dispatch(reduceCountInfo(message.chatId));                 
                }
                else {              
                    console.log(json.message);                                                      
                }
            })
            .catch((error)=>{ 
                console.log("error");                    
            });   

        }
            
    }, [dispatch, authData?.token, message, sender])

    return (
        <Wrapper ref={reference}>
            <ProfilImage sender={sender} src={message.sender.image || '/user.svg'} atl="userProfile"/> 
            <TextWrapper sender={sender} >
                <DatePar sender={sender}>{moment(message.createdAt).fromNow() }</DatePar>            
                <Message sender={sender} className={!message.read && !sender && unreadStyle ? "unread" : null} >{message.message}</Message>
            </TextWrapper>
        </Wrapper >
    )
};


const Wrapper = styled.div` 
position: relative;
    background: none;
    border: 1px solid #F8F8F8;
    border-top: none;  
    padding: 15px 5px; 
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
    margin: ${(p)=>p.sender ? '0 0px 0 7px' : '0 7px 0 0px'};;
    order: ${(p)=>p.sender ? 1 : 0};   
`; 

const TextWrapper = styled.div`
    //F0F2F5
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

    &.unread {
       font-weight: 600;
   }
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