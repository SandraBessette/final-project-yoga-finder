import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store";
import { SocketProvider } from './components/socketContext/SocketContext';
import App from "./App";

const loadState = () => {  
    const serializedState = localStorage.getItem('profile');
    if (serializedState === null) 
      return undefined;
   
    return {auth: {authData: JSON.parse(serializedState), status: 'loading',
    error: null}};
};

const persistedItemState = loadState();

const store = createStore(
  reducer,
  persistedItemState,  
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>  
      <Provider store={store}>
        <SocketProvider>
          <App /> 
        </SocketProvider> 
      </Provider> 
  </React.StrictMode>,
  document.getElementById("root")
);
