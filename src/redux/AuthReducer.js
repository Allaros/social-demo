import { getUserData, autorizeUser, logoutUser } from '../api/api';

const SET_USER_DATA = 'AuthReducer/SET_USER_DATA';
const SET_ERROR_MESSAGE = 'AuthReducer/SET_ERROR_MESSAGE';
const TOGGLE_LOADING = 'AuthReducer/TOGGLE_LOADING';

export const setUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, id, email, login, isAuth });
export const setErrorMessage = (errorMessage) => ({ type: SET_ERROR_MESSAGE, errorMessage });
export const toggleLoading = (inLoad) => ({ type: TOGGLE_LOADING, inLoad });

export const autorizeUserThunk = ({ email, password, rememberMe }) => {
   return async (dispatch) => {
      dispatch(toggleLoading(true));
      let response = await autorizeUser({ email, password, rememberMe });
      if (response.resultCode === 0) {
         dispatch(getUserDataThunk());
      } else if (response.resultCode === 1) {
         dispatch(setErrorMessage('Неверный логин или пароль'));
         dispatch(toggleLoading(false));
      }
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
      default:
         return state;
   }
};

export default authReducer;
