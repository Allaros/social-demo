import Avatar from '../img/Avatar.jpg';
import { loadProfile, getUserStatus, updateStatus, updateAvatar, updateUserInfo } from '../api/api.ts';
import { setErrorThunk } from './AppReducer.ts';

//Actions

const ADD_POST = 'ProfileReducer/ADD-POST';
const SET_USER_PROFILE = 'ProfileReducer/SET_USER_PROFILE';
const UPDATE_STATUS = 'ProfileReducer/UPDATE_STATUS';
const DELETE_POST = 'ProfileReducer/DELETE_POST';
const TOGGLE_PROFILE_LOADING = 'ProfileReducer/TOGGLE_PROFILE_LOADING';
const SAVE_PHOTO = 'ProfileReducer/SAVE_PHOTO';

type Contacts = {
   facebook: string | null
   website: string | null
   vk: string | null
   twitter: string | null
   instagram: string | null
   youtube: string | null
   github: string | null
   mainLink: string | null
} | null | undefined

export type Photos = {
   large: string | null
   small: string | null
}

type Profile = {
   aboutMe: string | null | undefined
   contacts: Contacts
   lookingForAJob: boolean | undefined
   lookingForAJobDescription: string | null | undefined
   fullName: string | undefined
   userId: number | undefined
   photos: Photos | undefined
}

type addPostType = {
   type: typeof ADD_POST
   postMessage: string
}

type deletePostType = {
   type: typeof DELETE_POST
   postId: number
}

type setUserProfileType = {
   type: typeof SET_USER_PROFILE
   profile: Profile
}

type updateStatusType = {
   type: typeof UPDATE_STATUS
   cusrrentStatus: string
}

type toggleProfileLoadingType = {
   type: typeof TOGGLE_PROFILE_LOADING
   isLoading: boolean
}

type savePhotoSuccessType = {
   type: typeof SAVE_PHOTO
   photos: Photos
}

type ProfileActionType = addPostType | deletePostType | setUserProfileType | updateStatusType | toggleProfileLoadingType | savePhotoSuccessType

export const addPost = (postMessage: string): addPostType => ({ type: ADD_POST, postMessage });

export const deletePost = (postId: number):deletePostType => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile:Profile):setUserProfileType => ({ type: SET_USER_PROFILE, profile });

export const updateStatusActionCreator = (cusrrentStatus: string): updateStatusType => ({ type: UPDATE_STATUS, cusrrentStatus });

export const toggleProfileLoading = (isLoading: boolean):toggleProfileLoadingType => ({ type: TOGGLE_PROFILE_LOADING, isLoading });

export const savePhotoSuccess = (photos: Photos):savePhotoSuccessType => ({ type: SAVE_PHOTO, photos });

//Thunks

export type UserInfoType ={
   aboutMe: string | null | undefined
   contacts: Contacts
   lookingForAJob: boolean
   lookingForAJobDescription: string | null
   fullName: string
}

export const updateUserInfoThunk = (info: UserInfoType) => {
   return async (dispatch: any) => {
      dispatch(toggleProfileLoading(true));
      await updateUserInfo(info);

      dispatch(toggleProfileLoading(false));
   };
};

export const loadUserProfile = (id: number | null) => {
   return async (dispatch: any) => {
      dispatch(toggleProfileLoading(true));
      let response = await loadProfile(id);
      dispatch(toggleProfileLoading(false));
      dispatch(setUserProfile(response));
   };
};
export const getStatus = (id: number | null) => {
   return async (dispatch: any) => {
      let response = await getUserStatus(id);
      dispatch(updateStatusActionCreator(response));
   };
};

export const updateUserStatus = (status: string) => {
   return async (dispatch: any) => {
      await updateStatus(status);
      dispatch(updateStatusActionCreator(status));
   };
};

export const updateUserAvatar = (image: any) => {
   return async (dispatch: any) => {
      try {
         let response = await updateAvatar(image);
         if (response.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.photos));
         }
      } catch (error) {
         switch (error.code) {
            case error.code === 'ERR_NETWORK':
               dispatch(setErrorThunk('Проблемы с сетью, либо размер файла слишком большой'));
               return;
            default:
               dispatch(setErrorThunk('Ошибка при обработке запроса'));
               return;
         }
      }
   };
};

//Reducer

type PostInfoType = {
   postImage: string
   id: number
   postText: string
   time: string
}

const initialState = {
   postInfo: [] as Array<PostInfoType>,
   profile: null as Profile | null,
   status: '' as string,
   profileLoading: true as boolean,
};

type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ProfileActionType): initialStateType => {
   switch (action.type) {
      case ADD_POST:
         let date = new Date();
         let newPost = {
            postImage: Avatar,
            id: 5,
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
         return { ...state, profile: state.profile ? { ...state.profile, photos: action.photos } : state.profile};
      default:
         return state;
   }
};

export default profileReducer;
