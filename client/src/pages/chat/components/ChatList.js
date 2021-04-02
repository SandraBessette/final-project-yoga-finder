import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import ChatListItem from './ChatListItem';
import { COLORS} from '../../../GlobalStyles';
import { onSmallTabletMediaQuery, onPhoneMediaQuery } from '../../../utils/responsives';



const ChatList = ()=>{
    const [selectedId, setSelectedId] = useState(null);
    const { authData } = useSelector((state)=>state.auth);  
    const { chatList, status, error } = useSelector((state)=>state.chat);  

    return (
        <Wrapper>
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />     
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />    
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />     
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />    
            <ChatListItem />
            <ChatListItem/>    
            
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 335px;
    border: 1px solid ${COLORS.lightGray};
    border-right: none;
    height: 100%;
  //  border-radius: 10px;
    padding: 5px;
    box-sizing: border-box;
    margin: 10px 0px 10px 0;

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
        border-right: 1px solid ${COLORS.lightGray};
    }

    
`;




export default ChatList; 