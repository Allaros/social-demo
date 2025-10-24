import React from 'react';
import Users from './Users.jsx';
import { connect } from 'react-redux';
import Avatar from '../../img/Avatar.jpg';
import { toggleFollow, changePage, toggleFollowing, getUsersPage, followUserThunk } from '../../redux/UsersReducer.js';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/selectors/users-selectors.js';

class UsersContainer extends React.Component {
   componentDidMount() {
      this.props.getUsersPage(this.props.currentPage, this.props.pageSize);
   }

   updateUsersPage = (p) => {
      this.props.getUsersPage(p, this.props.pageSize);
   };

   render() {
      return <Users {...this.props} updateUsersPage={this.updateUsersPage} />;
   }
}

let mapStateToProps = (state) => {
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
      avatar: Avatar,
   };
};

export default connect(mapStateToProps, { toggleFollow, changePage, toggleFollowing, getUsersPage, followUserThunk })(UsersContainer);
