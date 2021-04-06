
const initialState = { 
    chatList: [],
    status: "loading",
    error: null,
    selected: {chatId: null, user: null},
    count: {},
    messages: []
   
  }


  const chatReducer = (state = initialState, action) => { 
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
        return {
            ...state,                
            messages: action.data
            };
      }
      case 'UPDATE_SELECTEDCHAT': {    
          if (action.data.chatId === null)
          {    
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
          newChatList = newChatList.filter((chat)=>{        
              return (chat._id !== action.chat._id)             
          });
          newChatList.unshift({...action.chat});

          if (state.selected.chatId === action.message.chatId){         
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