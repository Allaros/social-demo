import classes from './ProfilePage.module.scss';

import Profile from './Profile/Profile.jsx';
import PostingForm from './PostingForm/PostingForm.jsx';
import Preloader from '../Common/Preloader/Preloader.jsx';

export default function ProfilePage(props) {
   if (!props.profile) {
      return <Preloader color="purple" />;
   }

   return (
      <div className={classes.content}>
         <Profile updateUserStatus={props.updateUserStatus} status={props.status} profile={props.profile} />
         {props.urPage && <PostingForm />}
      </div>
   );
}
