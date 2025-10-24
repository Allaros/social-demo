import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import profileReducer from './ProfileReducer';
import messagesReducer from './MessagesReducer';
import sidebarReducer from './SidebarReducer';
import usersReduser from "./UsersReducer";
import authReducer from './AuthReducer';
import { thunk } from 'redux-thunk';
import appReducer from './AppReducer';

let reducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    sidebarComponent: sidebarReducer,
    usersPage: usersReduser,
    auth: authReducer, 
    app: appReducer,
});

let store = configureStore({reducer}, applyMiddleware(thunk));

window.store = store;

export default store;