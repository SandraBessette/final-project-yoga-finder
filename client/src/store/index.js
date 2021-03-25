import { combineReducers } from 'redux';
import auth from './reducers/auth/auth-reducer';
//import store from './store-reducer';


export default combineReducers({ auth });