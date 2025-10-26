import ProfilePage from './ProfilePage';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadUserProfile, getStatus, updateUserStatus, updateUserAvatar } from '../../redux/ProfileReducer';
import WithAuthRedirect from '../../HOC/WithAuthRedirect';
import { compose } from 'redux';
import WithUrl from '../../HOC/WithUrl';
import { getProfile, getProfileId, getProfileLoading, getProfileStatus } from '../../redux/selectors/profile-selectors';

class ProfilePageContainer extends PureComponent {
   componentDidMount() {
      this.props.loadUserProfile(!!this.props.params.userId ? this.props.params.userId : this.props.id);
      this.props.getStatus(!!this.props.params.userId ? this.props.params.userId : this.props.id);
   }
   componentDidUpdate(prevProps) {
      if (this.props.params.userId !== prevProps.params.userId) {
         this.props.loadUserProfile(!!this.props.params.userId ? this.props.params.userId : this.props.id);
         this.props.getStatus(!!this.props.params.userId ? this.props.params.userId : this.props.id);
      }
   }

   render() {
      return (
         <ProfilePage
            urPage={!this.props.params.userId || this.props.params.userId === String(this.props.id)}
            updateUserStatus={this.props.updateUserStatus}
            status={this.props.status}
            isAuth={this.props.isAuth}
            profile={this.props.profile}
            profileLoading={this.props.profileLoading}
            updateUserAvatar={this.props.updateUserAvatar}
         />
      );
   }
}

let mapStateToProps = (state) => ({
   profile: getProfile(state),
   status: getProfileStatus(state),
   id: getProfileId(state),
   profileLoading: getProfileLoading(state),
});

export default compose(
   WithUrl,
   connect(mapStateToProps, { loadUserProfile, getStatus, updateUserStatus, updateUserAvatar }),
   WithAuthRedirect
)(ProfilePageContainer);
