import { combineReducers, configureStore } from '@reduxjs/toolkit';
import profileReducer from './ProfileReducer.ts';
import messagesReducer from './MessagesReducer.ts';
import sidebarReducer from './SidebarReducer';
import usersReduser from './UsersReducer';
import authReducer from './AuthReducer.ts';
import appReducer from './AppReducer.ts';

let rootReducer = combineReducers({
   profilePage: profileReducer,
   messagesPage: messagesReducer,
   sidebarComponent: sidebarReducer,
   usersPage: usersReduser,
   auth: authReducer,
   app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let store = configureStore({ reducer: rootReducer })

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];


//@ts-ignore
window.store = store;

export default store;
