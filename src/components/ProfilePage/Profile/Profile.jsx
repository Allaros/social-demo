import classes from "./Profile.module.scss";
import ProfileImage from "../../../img/profile-image.webp";
import Status from "./Status/Status";

import Avatar from "../../../img/Avatar.jpg";

export default function Profile(props) {
   return (
      <>
         <div className={classes.profile_image}>
            <img src={ProfileImage} alt="profile-image" />
         </div>
         <div className={classes.profile}>
            <div className={classes.avatar}>
               <img src={props.profile.photos.large || Avatar} alt="avatar" />
            </div>
            <div className={classes.info}>
               <div className={classes.name}>{props.profile.fullName}</div>
               <Status updateUserStatus={props.updateUserStatus} status={props.status} className={classes.user__status}/>
               <ul className={classes.list}>
                  <li className={classes.user_info}>facebook: {props.profile.contacts.facebook || "Нет такого"}</li>
                  <li className={classes.user_info}>github: {props.profile.contacts.github || "Нет такого"}</li>
                  <li className={classes.user_info}>instagram: {props.profile.contacts.instagram || "Нет такого"}</li>
                  <li className={classes.user_info}>email: {props.profile.contacts.mailLink || "Нет такого"}</li>
                  <li className={classes.user_info}>vk: {props.profile.contacts.vk || "Нет такого"}</li>
               </ul>
            </div>
         </div>
      </>
   );
}

