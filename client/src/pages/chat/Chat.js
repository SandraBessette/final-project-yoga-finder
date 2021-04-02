import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from '../../GlobalStyles';
import UserHeader from '../../components/userHeader/UserHeader';
import Spinner from '../../components/spinner/Spinner';
import Error from '../error/Error';
import Messages from './components/Messages';
import ChatList from './components/ChatList';
import { onSmallTabletMediaQuery } from '../../utils/responsives';
import { requestChatListInfo, receiveChatListInfo, receiveChatListInfoError, updateSelectedChat } from '../../store/reducers/chat/actions';


const Chat = ()=>{
    const { authData } = useSelector((state)=>state.auth);  
    const { chatList, status, error } = useSelector((state)=>state.chat);  
    //const [status, setStatus] = useState("idle");
   // const [business, setBusiness] = useState(null);
  //  const [error, setError] = useState("");
  const { id } = useParams();
    const dispatch = useDispatch();   

    const fectchChatList = useCallback(()=>{  
        dispatch(requestChatListInfo());          
        Promise.all([
            fetch('/chat', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authData?.token}`
                }               
            })
            .then((res) => res.json()),
            fetch(`/chat/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authData?.token}`
                }               
            })
            .then((res) => res.json())  
          ]).then(([chatListData, selectedData]) => { 
            if (chatListData.status === 200 && selectedData.status === 200){   
                console.log("hereid not undefined")  
                const chat = selectedData.data.chat ? selectedData.data.chat._id : null;
                dispatch(updateSelectedChat({chatId: chat, user: selectedData.data.user})); 
                dispatch(receiveChatListInfo(chatListData.data));
            }
            else{
                console.log("here");
                dispatch(receiveChatListInfoError("404"));    
            }
                     
          }).catch((err) => {
            console.log("err", err);
                dispatch(receiveChatListInfoError("500")); 
          });   
    }, [authData?.token, id, dispatch])
    
    useEffect(() => { 
        console.log("do it again")
        async function fetchData() {
            if ( id !== undefined){
                await fectchChatList();
            }
            else{
                dispatch(requestChatListInfo());  
                fetch('/chat', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authData?.token}`
                    }               
                })
                .then((res) => res.json())
                .then((json) => {
                    const {data } = json;            
                    if (json.status === 200) {   
                        if (data.length !==0 ) { 
                            const user = data[0].users[0]._id === authData.data._id ? data[0].users[1] : data[0].users[0]
                            dispatch(updateSelectedChat({chatId: data[0]._id, user: user}));
                        }  
                        else
                            dispatch(updateSelectedChat({chatId: null, user: null}));            
                        dispatch(receiveChatListInfo(data));
                    }
                    else {
                        dispatch(receiveChatListInfoError(json.status.toString())); 
                    }
                })
                .catch((error)=>{ 
                    dispatch(receiveChatListInfoError("500")); 
                });    
            } 
        }
        fetchData();     
    
    }, [authData?.token, dispatch, id, fectchChatList, authData.data._id]);


      if (status === 'error'){
            return <Error type={error}/>;
      }

    return(
        <Wrapper>           
            <UserHeader title="Chat"/> 
            {status === 'loading' && <Spinner />}
            {status === 'idle' && 
            <MainWrapper> 
                <ChatList/>
                <Messages/>                
            </MainWrapper>
            }
        </Wrapper>
    )


};

const Wrapper = styled.div`
   height: calc(100vh - ${HEADER_HEIGHT}); 
   font-size: 15px;
   
   
   ${onSmallTabletMediaQuery()} {   
        height: calc(100vh - ${HEADER_HEIGHT_SMALL});
    }
`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
    display: flex;
    //justify-content: center;
    //flex-direction: column;
   // flex: 1;
    align-items: center;
    height: calc(100vh - ${HEADER_HEIGHT} - 100px);//height: auto;

    ${onSmallTabletMediaQuery()} {
        justify-content: center;
    }


`;
export default Chat;