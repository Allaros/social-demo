import { ThunkAction } from 'redux-thunk';
import { getUserDataThunk } from './AuthReducer.ts';
import { RootState } from './reduxStore.ts';

//Actions

const SET_INITIALIZED_SUCCESS: string = 'AppReducer/SET_INITIALIZED_SUCCESS';
const SET_ERROR: string = 'AppReducer/SET_ERROR';

type InitializingSuccessType = {
   type: typeof SET_INITIALIZED_SUCCESS
}

type SetErrorType = {
   type: typeof SET_ERROR
   message: string | null
}

type AppActionType =  SetErrorType | InitializingSuccessType

export const setInitializingSuccess = ():InitializingSuccessType => ({ type: SET_INITIALIZED_SUCCESS });

export const setError = (message: string| null):SetErrorType => ({ type: SET_ERROR, message });


//Thunks

type ThunkType = ThunkAction<void, RootState, unknown, AppActionType>

export const setErrorThunk = (message: string): ThunkType => {
   return (dispatch) => {
      dispatch(setError(message));
      setTimeout(() => {
         dispatch(setError(null));
      }, 5000);
   };
};

export const initApp = (): ThunkType => {
   return (dispatch) => {
      let userDataLoaded = dispatch(getUserDataThunk());
      Promise.all([userDataLoaded]).then((response) => {
         dispatch(setInitializingSuccess());
      });
   };
};

//Reducer

type initialStateType = {
   initialized: boolean
   someError: null | string
}

const initialState: initialStateType = {
   initialized: false,
   someError: null,
};






const appReducer = (state = initialState, action: AppActionType ): initialStateType => {
   switch (action.type) {
      case SET_INITIALIZED_SUCCESS:
         return { ...state, initialized: true };
      case SET_ERROR:
         if ('message' in action && action.message !== undefined){
            return { ...state, someError: action.message}
         }
         return { ...state}
      default:
         return state;
   }
};

export default appReducer;
