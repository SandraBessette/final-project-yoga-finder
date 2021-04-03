 

const initialState = {
  authData: null,
  status: 'loading',
  error: null,

}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'AUTHENTICATE': {
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));        
    
      return {  ...state,
                authData: action.data,
                status: 'idle'};
      }
    case 'LOGOUT': {
      localStorage.clear(); 
     
      return { ...initialState };

    }
    case 'REQUEST_AUTH_INFO': {
      return {
          ...state,
          status: "loading",
          error: null
      };
    }
    case 'UPDATE_FAVORITES': {  
      
      return {
          ...state,                
          authData: {
                    ...state.authData,
                    data: {
                          ...state.authData.data,
                          favorites: [...action.favorites]

                          }

                    }
            };
    }
    case'RECEIVE_AUTH_INFO_ERROR': {
      return {
          ...state,                
          status: "error",
          error: action.error
      };
  }
    default:
      return state;
  }
};

export default authReducer;