
const initialState = { 
    chatList: [],
    status: "loading",
    error: null,
    selected: {chatId: null, user: null},
    count: {},
    messages: []
   
  }


  const chatReducer = (state = initialState, action) => {
   //   console.log(action.type);
    switch (action.type) {
      
      case 'RECEIVE_CHATLIST_INFO': {        
  
        return {    
            ...state,
            chatList: [...action.data],
            status: 'idle'};
        }
      
      case 'REQUEST_CHATLIST_INFO': {
        return {
            ...state,
            status: "loading",
            error: null
        };
      }
      case 'RECEIVE_CHATLIST_INFO_ERROR': {         
        return {
            ...state,                
            status: "error",
            error: action.error
        };
    }
    case 'RECEIVE_COUNT_INFO': {   
        return {
            ...state,                
            count: {...action.data}
            };
      }
     
      case 'RECEIVE_MESSAGES_INFO': {   
        
          console.log('receivemessageinf0', action.data)
        return {
            ...state,                
            messages: action.data
            };
      }
      case 'UPDATE_SELECTEDCHAT': {           
          console.log("here", action.data.chatId)
          if (action.data.chatId === null)
          {    
            console.log("hereinsideCondition", action.data)     
            return {
                ...state,                
                selected: {...action.data},
                messages: []
                }
          } 
        return {
            ...state,                
            selected: {...action.data}
            };
      }
      case 'REDUCE_COUNT_INFO': { 
          console.log('REDUCE_COUNT_INFO',!action.chatId || state.count[action.chatId] <= 0);
        if (!action.chatId || state.count[action.chatId] <= 0)
            return state;  
        return {
            ...state,                
            count: {
                ...state.count,
                [action.chatId]: state.count[action.chatId] - 1
            }  
            };
      }
      case 'INCREASE_COUNT_INFO': {
         
        return {
            ...state,                
            count: {
                ...state.count,
                [action.chatId]: state.count[action.chatId] ? state.count[action.chatId] + 1 : 1
            }  
            };
      }
      
      case 'UPDATE_MESSAGE': {  
          let newChatList = [...state.chatList];   
          console.log('newChatList', newChatList);       
          newChatList = newChatList.filter((chat)=>{
              console.log('action.chat._id', action.chat._id);
              console.log('chat', chat);
              console.log('chat._id', chat._id);
              return (chat._id !== action.chat._id)             
          });
          newChatList.unshift({...action.chat});

          if (state.selected.chatId === action.message.chatId){
              console.log('here in reducer', newChatList);
              return {
                ...state,  
                chatList: newChatList,               
                messages: [action.message, ...state.messages]
              }
          }
  
        return {
            ...state,  
            chatList: newChatList 
              };
            
    } 
    case 'RESET_CHAT': {   
        return {...initialState};
      }    
    
      default:
        return state;
    }
  };
  
  export default chatReducer;