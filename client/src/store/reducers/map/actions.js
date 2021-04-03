
export const receiveFilterInfo = (data) => ({
    type: "RECEIVE_FILTER_INFO",
    data 
  });

export const requestFilterInfo = () => ({
    type: "REQUEST_FILTER_INFO" 
  });
  
export const receiveFilterInfoError = (error) => ({
    type: 'RECEIVE_FILTER_INFO_ERROR',
    error,
  });

  export const updateFilter = (filter) => ({
    type: 'UPDATE_FILTER',
    filter,
  });

  export const updateTypeBusiness = (typeBusiness) => ({
    type: 'UPDATE_TYPE_BUSINESS',
    typeBusiness,
  });

  export const updataAnimatedId = (id) =>({
      type: 'UPDATE_ANIMATED_ID',
      id
  });

  export const updateCenter = (center, zoom) =>({
    type: 'UPDATE_CENTER',
    center,
    zoom
  });

  export const resetMap = () => ({
    type: 'RESET_MAP',
  });