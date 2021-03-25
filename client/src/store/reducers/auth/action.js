
export const authenticate = (data) => ({
    type: "AUTHENTICATE",
    data 
  });

  export const logout = () => ({
    type: "LOGOUT" 
  });

export const requestAuthInfo = () => ({
    type: "REQUEST_AUTH_INFO" 
  });
  
  export const receiveAuthInfoError = (error) => ({
    type: 'RECEIVE_AUTH_INFO_ERROR',
    error,
  });