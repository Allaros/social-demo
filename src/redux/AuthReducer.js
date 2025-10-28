import { getUserData, autorizeUser, logoutUser, getCaptcha } from '../api/api';

const SET_USER_DATA = 'AuthReducer/SET_USER_DATA';
const SET_ERROR_MESSAGE = 'AuthReducer/SET_ERROR_MESSAGE';
const TOGGLE_LOADING = 'AuthReducer/TOGGLE_LOADING';
const SET_CAPTCHA = 'AuthReducer/SET_CAPTCHA';

export const setUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, id, email, login, isAuth });
export const setErrorMessage = (errorMessage) => ({ type: SET_ERROR_MESSAGE, errorMessage });
export const toggleLoading = (inLoad) => ({ type: TOGGLE_LOADING, inLoad });
export const setCaptchaUrl = (captcha) => ({ type: SET_CAPTCHA, captcha });

export const autorizeUserThunk = ({ email, password, rememberMe, captcha }) => {
   return async (dispatch) => {
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
   return async (dispatch) => {
      let response = await getCaptcha();
      dispatch(setCaptchaUrl(response.url));
   };
};

export const logoutUserThunk = () => {
   return async (dispatch) => {
      let response = await logoutUser();
      if (response.resultCode === 0) {
         dispatch(setUserData(null, null, null, false));
      }
   };
};

export const getUserDataThunk = () => async (dispatch) => {
   let response = await getUserData();
   if (response.resultCode === 0) {
      dispatch(setUserData(response.data.id, response.data.email, response.data.login, true));
   }
   dispatch(toggleLoading(false));
};

const initialState = {
   id: null,
   email: null,
   login: null,
   isAuth: false,
   errorMessage: null,
   captcha: null,
   isLoading: false,
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
         return { ...state, id: action.id, email: action.email, login: action.login, isAuth: action.isAuth };
      case SET_ERROR_MESSAGE:
         return { ...state, errorMessage: action.errorMessage };
      case TOGGLE_LOADING:
         return { ...state, isLoading: action.inLoad };
      case SET_CAPTCHA:
         return { ...state, captcha: action.captcha };
      default:
         return state;
   }
};

export default authReducer;
