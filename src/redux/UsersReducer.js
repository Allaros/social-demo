import { getUsers, followUserRequest, unfollowUserRequest } from '../api/api';

const inintialState = {
   users: [],
   pageSize: 8,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: false,
   followingInProgress: [],
};

const CHANGE_PAGE = 'UsersReducer/CHANGE_PAGE';
const TOGGLE_FOLLOW = 'UsersReducer/FOLLOW';
const SET_USERS = 'UsersReducer/SET_USERS';
const SET_TOTAL_USERS_COUNT = 'UsersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'UsersReducer/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGGRESS = 'UsersReducer/TOGGLE_FOLLOWING_PROGGRESS';

export const toggleFollow = (userId, isFollowed) => ({ type: TOGGLE_FOLLOW, userId, isFollowed });

export const setUsers = (newUsers) => ({ type: SET_USERS, newUsers });

export const changePage = (pageNumber) => ({ type: CHANGE_PAGE, pageNumber });

export const setTotalUsersCount = (number) => ({ type: SET_TOTAL_USERS_COUNT, number });

export const toggleIsFetching = (toggle) => ({ type: TOGGLE_IS_FETCHING, toggle: toggle });

export const toggleFollowing = (id, fetching) => ({ type: TOGGLE_FOLLOWING_PROGGRESS, id, fetching });

export const getUsersPage = (currentPage, pageSize) => {
   return async (dispatch) => {
      dispatch(toggleIsFetching(true));

      let response = await getUsers(currentPage, pageSize);

      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.items));
      dispatch(setTotalUsersCount(response.totalCount));
      dispatch(changePage(currentPage));
   };
};

export const followUserThunk = (id, followed) => {
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

const usersReduser = (state = inintialState, action) => {
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
