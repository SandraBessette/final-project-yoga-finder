import { combineReducers } from 'redux';
import auth from './reducers/auth/auth-reducer';
import map from './reducers/map/map-reducer';
import chat from './reducers/chat/chat-reducer';
//import store from './store-reducer';


export default combineReducers({ auth, map, chat });