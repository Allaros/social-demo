import Avatar from '../img/Avatar.jpg';
import { loadProfile, getUserStatus, updateStatus, updateAvatar, updateUserInfo } from '../api/api';

const ADD_POST = 'ProfileReducer/ADD-POST';
const SET_USER_PROFILE = 'ProfileReducer/SET_USER_PROFILE';
const UPDATE_STATUS = 'ProfileReducer/UPDATE_STATUS';
const DELETE_POST = 'ProfileReducer/DELETE_POST';
const TOGGLE_PROFILE_LOADING = 'ProfileReducer/TOGGLE_PROFILE_LOADING';
const SAVE_PHOTO = 'ProfileReducer/SAVE_PHOTO';

export const addPost = (postMessage) => ({ type: ADD_POST, postMessage });

export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const updateStatusActionCreator = (cusrrentStatus) => ({ type: UPDATE_STATUS, cusrrentStatus });

export const toggleProfileLoading = (isLoading) => ({ type: TOGGLE_PROFILE_LOADING, isLoading });

export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO, photos });

export const updateUserInfoThunk = (info) => {
   return async (dispatch) => {
      dispatch(toggleProfileLoading(true));
      let response = await updateUserInfo(info);

      dispatch(toggleProfileLoading(false));
   };
};

export const loadUserProfile = (id) => {
   return async (dispatch) => {
      dispatch(toggleProfileLoading(true));
      let response = await loadProfile(id);
      dispatch(toggleProfileLoading(false));
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

export const updateUserAvatar = (image) => {
   return async (dispatch) => {
      let response = await updateAvatar(image);
      if (response.resultCode === 0) {
         dispatch(savePhotoSuccess(response.data.photos));
      }
   };
};

const initialState = {
   postInfo: [],
   profile: null,
   status: '',
   profileLoading: true,
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
      case TOGGLE_PROFILE_LOADING:
         return { ...state, profileLoading: action.isLoading };
      case SAVE_PHOTO:
         return { ...state, profile: { ...state.profile, photos: action.photos } };
      default:
         return state;
   }
};

export default profileReducer;
