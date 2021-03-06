import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { FaRegListAlt } from 'react-icons/fa';
import ChatListItem from './ChatListItem';
import SearchHeader from './SearchHeader';
import { COLORS} from '../../../GlobalStyles';
import { onSmallTabletMediaQuery} from '../../../utils/responsives';
import { updateSelectedChat } from '../../../store/reducers/chat/actions';




const ChatList = ()=>{     
    const { authData } = useSelector((state)=>state.auth);  
    const { chatList, selected } = useSelector((state)=>state.chat);   
    const dispatch = useDispatch();

    const handleClick = (ev, id, user)=>{
        ev.preventDefault();
        dispatch(updateSelectedChat({chatId: id, user: user}));
    };

    return (
        <Wrapper className={selected.chatId ? "selected" : null}>
            <SearchHeader />
            {chatList.length === 0 &&
            <WrapperNoMessages >
                <p>No chat list</p> 
                <FaRegListAlt size={60}/>
            </WrapperNoMessages>
            }
            {chatList.map((chat)=>{
                return(
                    <ChatListItem 
                        key={chat._id}
                        handleClick={handleClick}
                        date={chat.updatedAt}                       
                        id={chat._id}
                        lastMessage={chat.lastMessage} 
                        user={chat.users[0]._id === authData.data._id ? chat.users[1] : chat.users[0]}/>
                )
            })}            
            
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 400px;
    
    border: 1px solid ${COLORS.lightGray};
    border-right: none;
    height: 100%;
    padding: 5px;
    padding-top: 0;
    box-sizing: border-box;
    margin: 10px 0px 10px 0;

    overflow-y: auto;

    //Firefox
    scrollbar-color: ${COLORS.lightGray} transparent;
    scrollbar-width: thin;

    //Chrome  
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
        min-width: 335px;
        border-right: 1px solid ${COLORS.lightGray};
        width: 100%;
        
        
        &.selected {
            display: none;
        }
        
        &::-webkit-scrollbar {
            width: 8px;            
        }
    }    
`;

const WrapperNoMessages = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    color: #a083d0;  
    height: 100%;
    width: 100%;
    border-radius: 10px;
    padding: 10px 0;
    box-sizing: border-box; 

    & p{
        color: ${COLORS.primary};
        
    }
`;


export default ChatList; 