import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import  moment from 'moment'; 
import { COLORS} from '../../../GlobalStyles';
import { reduceCountInfo } from '../../../store/reducers/chat/actions';


const MessageItem = ({reference = null, sender, message})=>{
    const { authData } = useSelector((state)=>state.auth);
    const { count } = useSelector((state)=>state.chat);  
    const dispatch = useDispatch();

    useEffect(()=>{
        if (!message.read && !sender){
           // setStatus("loading");   
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
                    console.log("message.chatId", message.chatId, message); 
                  
                    dispatch(reduceCountInfo(message.chatId));                 
                }
                else {
                // setError(status.toString());
                // setStatus("error");
                    console.log(json.message);                                                      
                }
            })
            .catch((error)=>{ 
                console.log("error");
            // setError("500");              
            // setStatus("error");               
            });   

        }
            
    }, [dispatch, authData?.token, message.chatId, message.read, sender, message._id])

    return (
        <Wrapper ref={reference}>
            <ProfilImage sender={sender} src={message.sender.image || '/user.svg'} atl="userProfile"/> 
            <TextWrapper sender={sender}>
                <DatePar sender={sender}>{moment(message.createdAt).fromNow() }</DatePar>            
                <Message sender={sender} >{message.message}</Message>
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