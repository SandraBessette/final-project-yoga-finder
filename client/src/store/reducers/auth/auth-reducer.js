 
const initialState = {
  authData: null,
  status: 'loading',
  error: null,

}//setUser(JSON.parse(localStorage.getItem('profile')));
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
      /*let newFavorites = [... state.authData.data.favorites];    
      if (newFavorites.includes(action.id)){
          newFavorites = newFavorites.filter((favorite)=>(favorite._id !== action.id));
      }
      else{
        newFavorites.push(action.id);
      }*/

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