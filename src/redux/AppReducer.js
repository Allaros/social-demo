import { getUserDataThunk } from './AuthReducer';

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';

export const setInitializingSuccess = () => ({ type: SET_INITIALIZED_SUCCESS });

const initialState = {
   initialized: false,
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
      default:
         return state;
   }
};

export default appReducer;
