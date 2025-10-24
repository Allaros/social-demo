import ProfilePage from './ProfilePage';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadUserProfile, getStatus, updateUserStatus } from '../../redux/ProfileReducer';
import WithAuthRedirect from '../../HOC/WithAuthRedirect';
import { compose } from 'redux';
import WithUrl from '../../HOC/WithUrl';

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
         />
      );
   }
}

let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status,
   id: state.auth.id,
});

export default compose(WithUrl, connect(mapStateToProps, { loadUserProfile, getStatus, updateUserStatus }), WithAuthRedirect)(ProfilePageContainer);
