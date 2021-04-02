import React,  {useState, useEffect, useRef}  from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import MessageItem from './MessageItem';
import { MdSend } from 'react-icons/md'
import { COLORS, HEADER_HEIGHT, HEADER_HEIGHT_SMALL} from '../../../GlobalStyles';
import { onSmallTabletMediaQuery, onPhoneMediaQuery } from '../../../utils/responsives';
import IconButton from '../../../components/button/IconButton';
import ProfileInfo from '../../singleBusiness/components/ProfileInfo';
import Spinner from '../../../components/spinner/Spinner';
import Error from '../../error/Error';
import { receiveMessageInfo, updateMessage } from '../../../store/reducers/chat/actions';

const Messages = ()=>{
    const { authData } = useSelector((state)=>state.auth); 
    const { selected, messages } = useSelector((state)=>state.chat);   
    const [status, setStatus] = useState("loading"); 
    const [error, setError] = useState("");
    const [messageText, setMessageText] = useState("");
    const messagesEndRef = useRef(null);
    const dispatch = useDispatch();

    const handleChange =(ev)=>{
        setMessageText(ev.target.value);
    }

    const handleSendClick = (e) => { 
        e.preventDefault(); 
        setStatus("loading");   
            fetch('/chat/message/', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authData?.token}`
                } ,
                body: JSON.stringify({  receiverId: selected.user._id , message: messageText }),              
            })
            .then((res) => res.json())
            .then((json) => {
                const { status, data } = json;            
                if (status === 201) {   
                    console.log(data)            
                    dispatch(updateMessage(data.message, data.chat));                 
                    setStatus("idle");    
                               
                }
                else {
                    setError(status.toString());
                    setStatus("error");                                                      
                }
            })
            .catch((error)=>{  
                setError("500");             
                setStatus("error");               
            });         
      }; 

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

     useEffect(() => {
        scrollToBottom();
      }, [messages]);

      useEffect(()=>{
          if(selected.chat){
            setStatus("loading");   
            fetch(`/chat/messages/${selected.chat._id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authData?.token}`
                }               
            })
            .then((res) => res.json())
            .then((json) => {
                const { status, data } = json;            
                if (status === 200) {   
                    console.log("messages")            
                    dispatch(receiveMessageInfo(data));                 
                    setStatus("idle");    
                               
                }
                else {
                    setError(status.toString());
                    setStatus("error");                                                      
                }
            })
            .catch((error)=>{  
                setError("500");             
                setStatus("error");               
            });  
        } 
        else{
            setStatus("idle");  
        }  
    
      },[authData?.token, dispatch, selected.chat]);

      if(status === 'error'){
          return <Error type={error}/>;
      }
    return (
        <>
        <Wrapper>
            {status === 'loading' && <Spinner />}
            {status === 'idle' && <>
            {selected.user === null ? <p>No message yet</p> : <>
            <Header><ProfileInfo disabled={true} user={selected.user}></ProfileInfo></Header>
            <WrapperMessages >
            {messages.map((message, index)=>{
                return(
                    <MessageItem 
                        reference={index=== 0 ?messagesEndRef: null}
                        message={message}
                        sender={message.sender._id === authData.data.user._id}/>
                )
            })} 
            </WrapperMessages>
            <Footer>
                <input type="text" name="fname" value={messageText} onChange={handleChange} />
                <IconButton margin='0 2px 0 0' padding='5px' onclick={handleSendClick}>
                    <MdSend size={22} />
                </IconButton >
            </Footer>
           </>} </>}
        </Wrapper>
       
        </>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;    
    width: 100%;
    border: 1px solid ${COLORS.lightGray};
    height: 100%;
   // border-radius: 10px;
    padding: 0;
    box-sizing: border-box;
    margin: 10px 20px 10px 0px;   

    overflow-y: auto;  
    &::-webkit-scrollbar {
        width: 6px;
        background: transparent;      
    }
  
    &:hover::-webkit-scrollbar {
        &-thumb {
            background: ${COLORS.lightGray};
            border-radius: 15px;
        }  
    } 
 
    &::-webkit-scrollbar-thumb { 
        background: transparent;
        border-radius: 15px;
    }   

    ${onSmallTabletMediaQuery()} {
        display: none;
    }
`;

const WrapperMessages = styled.div`
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    padding: 10px 0;
    box-sizing: border-box;  
   
`;

const Footer = styled.div`
    height: 65px;  
    backdrop-filter: blur(40px);
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    left: 0;
    bottom: 0;
    width: 100%;
    

    & input {
        height: 35px;
        width: 90%;
        border-radius: 15px;
        border: solid 2px lightgray;
        margin: 10px;
    }
`;

const Header = styled.div`
    height: 65px;  
    backdrop-filter: blur(40px);
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 4;
    padding-top: 7px;
    padding-left: 10px;
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    border-bottom: 1px solid ${COLORS.lightGray};

`;

const Lastdiv = styled.div`
    height: 0px;
`;


export default Messages; 