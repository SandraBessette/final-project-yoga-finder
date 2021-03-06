export const updateSelectedChat = (data) => ({
    type: 'UPDATE_SELECTEDCHAT',
    data,
  });

  export const updateMessage = (message, chat) => ({
    type: 'UPDATE_MESSAGE',
    message,
    chat
  });

  export const reduceCountInfo = (chatId) => ({
    type: 'REDUCE_COUNT_INFO',
    chatId,
  });

  export const increaseCountInfo = (chatId) => ({
    type: 'INCREASE_COUNT_INFO',
    chatId,
  });

  export const receiveCountInfo = (data) => ({
    type: 'RECEIVE_COUNT_INFO',
    data,
  });

  export const receiveMessageInfo = (data) => ({
    type: 'RECEIVE_MESSAGES_INFO',
    data,
  });

  export const receiveChatListInfo = (data) => ({
    type: 'RECEIVE_CHATLIST_INFO',
    data,
  });

  export const requestChatListInfo = () => ({
    type: 'REQUEST_CHATLIST_INFO',
   
  });

  export const receiveChatListInfoError = (error) => ({
    type: 'RECEIVE_CHATLIST_INFO_ERROR',
    error,
  });//'RESET_CHAT'

  export const resetChat = () => ({
    type: 'RESET_CHAT',
  });