import { getUserData, autorizeUser, logoutUser, getCaptcha, loadProfile } from '../api/api.ts';

//Actions

const SET_USER_DATA = 'AuthReducer/SET_USER_DATA';
const SET_ERROR_MESSAGE = 'AuthReducer/SET_ERROR_MESSAGE';
const TOGGLE_LOADING = 'AuthReducer/TOGGLE_LOADING';
const SET_CAPTCHA = 'AuthReducer/SET_CAPTCHA';
const SET_YOUR_PICTURE = 'AuthReducer/SET_YOUR_PICTURE';

type setUserDataType = {
   type: typeof SET_USER_DATA
   id: number | null
   email: string | null
   login: string | null
   isAuth: boolean
}

type setErrorMessageType = {
   type: typeof SET_ERROR_MESSAGE
   errorMessage: string | null
}

type toggleLoadingType = {
   type: typeof TOGGLE_LOADING
   inLoad: boolean
}

type setCaptchaUrlType = {
   type: typeof SET_CAPTCHA
   captcha: string | null
}

type setYourPictureType = {
   type: typeof SET_YOUR_PICTURE
   picture: string | null
}

type AuthActionType = setUserDataType | setErrorMessageType | toggleLoadingType | setCaptchaUrlType | setYourPictureType

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean):setUserDataType => ({ type: SET_USER_DATA, id, email, login, isAuth });
export const setErrorMessage = (errorMessage: string | null): setErrorMessageType => ({ type: SET_ERROR_MESSAGE, errorMessage });
export const toggleLoading = (inLoad: boolean):toggleLoadingType => ({ type: TOGGLE_LOADING, inLoad });
export const setCaptchaUrl = (captcha: string | null): setCaptchaUrlType => ({ type: SET_CAPTCHA, captcha });
export const setYourPicture = (picture: string | null) => ({type: SET_YOUR_PICTURE, picture});

//Thunks

type payloadType = {
   email: string | null
   password: string | null
   rememberMe: boolean
   captcha: string | null
}

export const loadUserPicture = (id: number) => {
   return async (dispatch) => {
      let response = await loadProfile(id)
      dispatch(setYourPicture(response.photos.large));
   }
}

export const autorizeUserThunk = ({ email, password, rememberMe, captcha }: payloadType) => {
   return async (dispatch: any) => {
      dispatch(toggleLoading(true));
      let response = await autorizeUser({ email, password, rememberMe, captcha });
      if (response.resultCode === 0) {
         dispatch(getUserDataThunk());
         dispatch(setCaptchaUrl(null));
      } else if (response.resultCode === 1) {
         dispatch(setErrorMessage('Неверный логин или пароль'));
         dispatch(toggleLoading(false));
      } else if (response.resultCode === 10) {
         dispatch(setErrorMessage('Пройдите капчу'));
         dispatch(getCaptchaURL());
         dispatch(toggleLoading(false));
      }
   };
};

export const getCaptchaURL = () => {
   return async (dispatch: any) => {
      let response = await getCaptcha();
      dispatch(setCaptchaUrl(response.url));
   };
};

export const logoutUserThunk = () => {
   return async (dispatch: any) => {
      let response = await logoutUser();
      if (response.resultCode === 0) {
         dispatch(setUserData(null, null, null, false));
      }
   };
};

export const getUserDataThunk = () => async (dispatch: any) => {
   let response = await getUserData();
   if (response.resultCode === 0) {
      dispatch(setUserData(response.data.id, response.data.email, response.data.login, true));
      dispatch(loadUserPicture(response.data.id));
   }
   dispatch(toggleLoading(false));
};

//Reducer

type initialStateType = {
   id: null | number
   email: null | string
   login: null | string
   isAuth: boolean
   errorMessage: null | string
   captcha: null | string
   isLoading: boolean
   yourPicture: null | string
};

const initialState: initialStateType = {
   id: null,
   email: null,
   login: null,
   isAuth: false,
   errorMessage: null,
   captcha: null,
   isLoading: false,
   yourPicture: null
};

const authReducer = (state = initialState, action: AuthActionType): initialStateType => {
   switch (action.type) {
      case SET_USER_DATA:
         return { ...state, id: action.id, email: action.email, login: action.login, isAuth: action.isAuth };
      case SET_ERROR_MESSAGE:
         return { ...state, errorMessage: action.errorMessage };
      case TOGGLE_LOADING:
         return { ...state, isLoading: action.inLoad };
      case SET_CAPTCHA:
         return { ...state, captcha: action.captcha };
      case SET_YOUR_PICTURE:
         return { ...state, yourPicture: action.picture}
      default:
         return state;
   }
};

export default authReducer;
