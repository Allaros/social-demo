import { ThunkAction } from 'redux-thunk';
import { getUsers, followUserRequest, unfollowUserRequest } from '../api/api.ts';

import { Photos } from './ProfileReducer';
import { RootState } from './reduxStore.ts';

//Actions

const CHANGE_PAGE = 'UsersReducer/CHANGE_PAGE';
const TOGGLE_FOLLOW = 'UsersReducer/FOLLOW';
const SET_USERS = 'UsersReducer/SET_USERS';
const SET_TOTAL_USERS_COUNT = 'UsersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'UsersReducer/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGGRESS = 'UsersReducer/TOGGLE_FOLLOWING_PROGGRESS';

type toggleFollowType = {
   type: typeof TOGGLE_FOLLOW
   userId: number
   isFollowed: boolean
} 

type setUsersType = {
   type: typeof SET_USERS
   newUsers: Array<User>
}

type changePageType = {
   type: typeof CHANGE_PAGE
   pageNumber: number
}

type setTotalUsersCountType = {
   type: typeof SET_TOTAL_USERS_COUNT
   number: number
}

type toggleIsFetchingType = {
   type: typeof TOGGLE_IS_FETCHING
   toggle: boolean
}

type toggleFollowingType = {
   type: typeof TOGGLE_FOLLOWING_PROGGRESS
   id: number
   fetching: boolean
}

type UsersActionType = toggleFollowType | setUsersType | changePageType | setTotalUsersCountType | toggleIsFetchingType | toggleFollowingType

export const toggleFollow = (userId: number, isFollowed: boolean):toggleFollowType => ({ type: TOGGLE_FOLLOW, userId, isFollowed });

export const setUsers = (newUsers: Array<User>):setUsersType => ({ type: SET_USERS, newUsers });

export const changePage = (pageNumber: number):changePageType => ({ type: CHANGE_PAGE, pageNumber });

export const setTotalUsersCount = (number: number):setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, number });

export const toggleIsFetching = (toggle: boolean):toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, toggle: toggle });

export const toggleFollowing = (id:number, fetching: boolean):toggleFollowingType => ({ type: TOGGLE_FOLLOWING_PROGGRESS, id, fetching });

//Thunks

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, UsersActionType>

export const getUsersPage = (currentPage: number, pageSize: number): ThunkType => {
   return async (dispatch) => {
      dispatch(toggleIsFetching(true));

      let response = await getUsers(currentPage, pageSize);

      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.items));
      dispatch(setTotalUsersCount(response.totalCount));
      dispatch(changePage(currentPage));
   };
};

export const followUserThunk = (id: number, followed: boolean): ThunkType => {
   return async (dispatch) => {
      dispatch(toggleFollowing(id, true));
      if (followed) {
         let response = await unfollowUserRequest(id);
         if (response.resultCode === 0) {
            dispatch(toggleFollow(id, false));
         }
      } else {
         let response = await followUserRequest(id);
         if (response.resultCode === 0) {
            dispatch(toggleFollow(id, true));
         }
      }
      dispatch(toggleFollowing(id, false));
   };
};

//Reducer

type User = {
   id: number
   name: string
   status: string | undefined
   photos: Photos
   followed: boolean
}

type inintialStateType = {
   users: Array<User>
   pageSize: number
   currentPage: number
   totalUsersCount: number
   isFetching: boolean
   followingInProgress: Array<number>
}

const inintialState:inintialStateType = {
   users: [],
   pageSize: 8,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: false,
   followingInProgress: [],
};

const usersReduser = (state = inintialState, action: UsersActionType) => {
   switch (action.type) {
      case TOGGLE_FOLLOW:
         return {
            ...state,
            users: state.users.map((user) => {
               if (user.id === action.userId) {
                  return { ...user, followed: action.isFollowed };
               }
               return user;
            }),
         };
      case SET_USERS:
         return { ...state, users: [...action.newUsers] };
      case CHANGE_PAGE:
         return { ...state, currentPage: action.pageNumber };
      case SET_TOTAL_USERS_COUNT:
         return { ...state, totalUsersCount: action.number };
      case TOGGLE_IS_FETCHING:
         return { ...state, isFetching: action.toggle };
      case TOGGLE_FOLLOWING_PROGGRESS:
         return {
            ...state,
            followingInProgress: action.fetching ? [...state.followingInProgress, action.id] : state.followingInProgress.filter((id) => id !== action.id),
         };
      default:
         return state;
   }
};

export default usersReduser;
