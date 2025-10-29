import { getUserDataThunk } from './AuthReducer';

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';
const SET_ERROR = 'SET_ERROR';

export const setInitializingSuccess = () => ({ type: SET_INITIALIZED_SUCCESS });

export const setError = (message) => ({ type: SET_ERROR, message });

export const setErrorThunk = (message) => {
   return (dispatch) => {
      dispatch(setError(message));
      setTimeout(() => {
         dispatch(setError(null));
      }, 5000);
   };
};

const initialState = {
   initialized: false,
   someError: null,
};

export const initApp = () => {
   return (dispatch) => {
      let userDataLoaded = dispatch(getUserDataThunk());
      Promise.all([userDataLoaded]).then((response) => {
         dispatch(setInitializingSuccess());
      });
   };
};

const appReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_INITIALIZED_SUCCESS:
         return { ...state, initialized: true };
      case SET_ERROR:
         return { ...state, someError: action.message };
      default:
         return state;
   }
};

export default appReducer;
