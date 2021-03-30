 
const initialState = { 
    filters:{

    },
    status: "loading",
    error: null,
    animatedId: null
  }

  const mapReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case 'RECEIVE_FILTER_INFO': {        
  
        return {  ...state,
                  filters: action.data,
                  status: 'idle'};
        }
      
      case 'REQUEST_FILTER_INFO': {
        return {
            ...state,
            status: "loading",
            error: null
        };
      }
      case 'UPDATE_TYPE_BUSINESS': {   
        return {
            ...state,                
            filters: {
                    ...state.filters,
                    type:{
                        ...state.filters.type,
                        [action.typeBusiness]: !state.filters.type[action.typeBusiness]
                        }
                    }
              };
      }
      case 'UPDATE_FILTER': {  
  
        return {
            ...state,  
            filters: {
                ...state.filters,              
                filter: {
                        ...state.filters.filter,
                        ...action.filter  
                        }
                }
              };
            
    }
      case 'RECEIVE_FILTER_INFO_ERROR': {
          console.log('action.error', action.error);
        return {
            ...state,                
            status: "error",
            error: action.error
        };
    }
    case 'UPDATE_ANIMATED_ID': {  
  
        return {
                ...state,  
                animatedId: action.id
              };
            
    }
      default:
        return state;
    }
  };
  
  export default mapReducer;