import React,  {useEffect, useRef}  from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import MessageItem from './MessageItem';
import { MdSend } from 'react-icons/md'
import { COLORS, HEADER_HEIGHT, HEADER_HEIGHT_SMALL} from '../../../GlobalStyles';
import { onSmallTabletMediaQuery, onPhoneMediaQuery } from '../../../utils/responsives';
import IconButton from '../../../components/button/IconButton';
import ProfileInfo from '../../singleBusiness/components/ProfileInfo'

const Messages = ()=>{
    const { authData } = useSelector((state)=>state.auth);  
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

      useEffect(() => {
        scrollToBottom()
      }, []);

    return (
        <>
        <Wrapper>
            <Header><ProfileInfo user={authData.data}></ProfileInfo></Header>
            <WrapperMessages >           
            <MessageItem reference={messagesEndRef} sender={true} />
            <MessageItem sender={false}/>
            <MessageItem sender={true} />
            <MessageItem sender={false}/>
            <MessageItem sender={true} />
            <MessageItem sender={false}/>
            
            <MessageItem sender={true} />
            <MessageItem sender={false}/>
            <MessageItem sender={true} />
            <MessageItem sender={false}/>
            
            </WrapperMessages>
            <Footer><input type="text" name="fname"/><IconButton margin='0 2px 0 0' padding='5px'><MdSend size={22} /></IconButton ></Footer>
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