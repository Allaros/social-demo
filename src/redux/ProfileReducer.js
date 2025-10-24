import Avatar from '../img/Avatar.jpg';
import { loadProfile, getUserStatus, updateStatus } from '../api/api';

const ADD_POST = 'ProfileReducer/ADD-POST';
const SET_USER_PROFILE = 'ProfileReducer/SET_USER_PROFILE';
const UPDATE_STATUS = 'ProfileReducer/UPDATE_STATUS';
const DELETE_POST = 'ProfileReducer/DELETE_POST';

export const addPost = (postMessage) => ({ type: ADD_POST, postMessage });

export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const updateStatusActionCreator = (cusrrentStatus) => ({ type: UPDATE_STATUS, cusrrentStatus });

export const loadUserProfile = (id) => {
   return async (dispatch) => {
      let response = await loadProfile(id);
      dispatch(setUserProfile(response));
   };
};
export const getStatus = (id) => {
   return async (dispatch) => {
      let response = await getUserStatus(id);
      dispatch(updateStatusActionCreator(response));
   };
};

export const updateUserStatus = (status) => {
   return async (dispatch) => {
      await updateStatus(status);
      dispatch(updateStatusActionCreator(status));
   };
};

const initialState = {
   postInfo: [],
   profile: null,
   status: '',
};

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_POST:
         let date = new Date();
         let newPost = {
            postImage: Avatar,
            id: '5',
            postText: action.postMessage,
            time: date.toLocaleTimeString([], {
               hour: '2-digit',
               minute: '2-digit',
            }),
         };

         if (!action.postMessage) {
            return state;
         }
         return { ...state, postInfo: [...state.postInfo, newPost] };

      case SET_USER_PROFILE:
         return { ...state, profile: action.profile };

      case UPDATE_STATUS:
         return { ...state, status: action.cusrrentStatus };
      case DELETE_POST:
         return { ...state, postInfo: state.postInfo.filter((_, index) => index !== action.postId) };
      default:
         return state;
   }
};

export default profileReducer;
