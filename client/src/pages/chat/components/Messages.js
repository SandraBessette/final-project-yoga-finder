import React,  {useState, useEffect, useRef}  from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import MessageItem from './MessageItem';
import { MdSend } from 'react-icons/md';
import { SiWechat }from 'react-icons/si';
import { IoIosArrowDropleft } from 'react-icons/io'
import { COLORS, HEADER_HEIGHT, HEADER_HEIGHT_SMALL} from '../../../GlobalStyles';
import { onSmallTabletMediaQuery, onPhoneMediaQuery } from '../../../utils/responsives';
import IconButton from '../../../components/button/IconButton';
import ProfileInfo from '../../singleBusiness/components/ProfileInfo';
import Spinner from '../../../components/spinner/Spinner';
import Error from '../../error/Error';
import { receiveMessageInfo, updateMessage, updateSelectedChat } from '../../../store/reducers/chat/actions';

const Messages = ({singleUser})=>{
    const { authData } = useSelector((state)=>state.auth); 
    const { selected, messages, count } = useSelector((state)=>state.chat);      
    const [status, setStatus] = useState("loading"); 
    const [error, setError] = useState("");
    const [messageText, setMessageText] = useState("");
    const messagesEndRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
   // const { id } = useParams();

    const handleChange =(ev)=>{
        setMessageText(ev.target.value);
    }
    const handleClickChat =(ev)=>{
        ev.preventDefault();
        dispatch(updateSelectedChat({chatId: null, user: null})); 
        if (singleUser)
            history.push('/user/chat/');
       // setMessageText(ev.target.value);
    };

    const classString = ()=>{    
       let name = null;
        if (selected.chatId && singleUser)
            name = "selected singleUser";
        else if (selected.chatId )
            name = "selected";
        else if (singleUser)
            name = "singleUser";
           return name;
    }

    const handleSendClick = (e) => { 
        e.preventDefault(); 
        if (messageText === ""){
            return;
        }           
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
                console.log('post is working', data); 
                setMessageText("");
                if(!selected.chatId){
                    const user = data.chat.users[0]._id === authData.data._id ? data.chat.users[1] : data.chat.users[0] 
                    dispatch(updateSelectedChat({chatId: data.chat._id, user: user})); 
                }         
                dispatch(updateMessage(data.message, data.chat)); 
            }
            else {
                setError(status.toString());
                setStatus("error");
                console.log(json.message) ;                                                      
            }
        })
        .catch((error)=>{  
            setError("500");             
            setStatus("error");
            console.log('error', error) ;                      
        });         
    }; 

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
  
     useEffect(() => {
        scrollToBottom();
        console.log("scrool");
      }, [status, messages]);

      useEffect(()=>{
        console.log('selected.chatId', selected.chatId, singleUser)
          if(selected.chatId){
            
            setStatus("loading");   
            fetch(`/chat/messages/${selected.chatId}`, {
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
                    console.log("messages", data)            
                    dispatch(receiveMessageInfo(data));                 
                    setStatus("idle");    
                               
                }
                else {
                    setError(status.toString());
                    setStatus("error");  
                    console.log(json.message)                                                    
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
    
      },[authData?.token, dispatch, selected.chatId]);

      if(status === 'error'){
          return <Error type={error}/>;
      }
    return (
        <>
        <Wrapper className={classString()}>
            {status === 'loading' && <Spinner />}
            {status === 'idle' && <>
            {selected.user === null ? 
            <WrapperNoMessages >
                <p>Messages</p> 
                <SiWechat size={200}/>
                </WrapperNoMessages>:
             <>
            <Header>
                <IconWrapper className={singleUser ? "singleUser" : null}>
                <IconButton margin='0 2px 0 0' padding='0px' onclick={handleClickChat}>
                    <IoIosArrowDropleft size={22} />
                </IconButton >
                </IconWrapper>
                <ProfileInfo disabled={true} user={selected.user}></ProfileInfo>
            </Header>
            <WrapperMessages >
            {messages.map((message, index)=>{
               
                return(
                    <MessageItem 
                        key={message._id}
                        reference={index === 0 ? messagesEndRef: null}
                        message={message}
                        sender={message.sender._id === authData.data._id}/>
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
        &.singleUser {
            display: block;
        }
        
        &.selected {
            display: block;            
        }

        &::-webkit-scrollbar {
            width: 8px;
        }
        border: none;
        
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

const WrapperNoMessages = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    color: #cbbae5;//#a083d0;// ${COLORS.lightGray};//#a083d0;
  
    height: 100%;
    width: 100%;
    border-radius: 10px;
    padding: 10px 0;
    box-sizing: border-box; 

    & p{
        color: ${COLORS.primary};
        
    }
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

const IconWrapper = styled.div`
    
    margin: 0 25px 0 0;
    display: none;
    &.singleUser {
        display: flex;
        align-items: center;   
        }

    ${onSmallTabletMediaQuery()} {
        display: flex;
        align-items: center;     
    }
`;

const Header = styled.div`
    display: flex;
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