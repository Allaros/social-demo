import classes from './Profile.module.scss';
import ProfileImage from '../../../img/profile-image.webp';
import Status from './Status/Status';
import Button from '../../Common/Button/Button';
import ProfilePopup from './ProfilePopup/ProfilePopup';

import Avatar from '../../../img/Avatar.jpg';
import editIcon from '../../../img/edit-button-svgrepo-com.svg';

import { useState, useRef } from 'react';

export default function Profile(props) {
   const [imageFile, setImageFile] = useState(null);
   const [popupActiveState, setPopupActiveState] = useState(false);
   const [popupActiveClass, setPopupActiveClass] = useState('inactive');

   let fileInputRef = useRef(null);

   let onInputFileChange = (e) => {
      if (e.target.files.length > 0) {
         setImageFile(e.target.files[0]);
      }
   };

   let onAvatarSave = () => {
      props.updateUserAvatar(imageFile);
      fileInputRef.current.value = null;
      setImageFile(null);
   };

   let isThereInfo = (info) => {
      return info || 'Нет информации';
   };

   let activatePopup = () => {
      setPopupActiveState(true);
   };

   return (
      <>
         <div className={classes.profile_image}>
            <img src={ProfileImage} alt="profile-image" />
         </div>
         <div className={classes.profile}>
            <div className={classes.avatar}>
               <div className={classes.avatar__photo}>
                  <img src={props.profile.photos.large || Avatar} alt="avatar" />
               </div>
               {props.urPage ? (
                  <div className={classes.avatar__inputContainer}>
                     <input ref={fileInputRef} onChange={onInputFileChange} id="avatar-input" className={classes.avatar__input} type="file" />
                     <div className={classes.avatar__buttonContainer}>
                        <label className={classes.avatar__button} htmlFor="avatar-input">
                           Загрузить фото
                        </label>
                        <Button onClick={onAvatarSave} class={`${classes.avatar__save} ${!!imageFile ? classes.choosed : null}`}>
                           Сохранить
                        </Button>
                     </div>
                  </div>
               ) : null}
            </div>
            <div className={classes.info}>
               <div className={classes.name}>
                  {props.profile.fullName}{' '}
                  <button className={classes.editImage}>
                     <img onClick={activatePopup} src={editIcon} alt="edit icon" />
                  </button>
               </div>
               <Status updateUserStatus={props.updateUserStatus} status={props.status} className={classes.user__status} />
               <div className={classes.jobSearch}>
                  <p>{props.profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</p>
                  <p>{props.profile.lookingForAJobDescription}</p>
               </div>
               <ul className={classes.contacts__list}>
                  <li className={classes.user_info}>facebook: {isThereInfo(props.profile.contacts.facebook)}</li>
                  <li className={classes.user_info}>github: {isThereInfo(props.profile.contacts.github)}</li>
                  <li className={classes.user_info}>instagram: {isThereInfo(props.profile.contacts.instagram)}</li>
                  <li className={classes.user_info}>email: {isThereInfo(props.profile.contacts.mailLink)}</li>
                  <li className={classes.user_info}>vk: {isThereInfo(props.profile.contacts.vk)}</li>
               </ul>
            </div>
         </div>
         {popupActiveState ? <ProfilePopup /> : null}
      </>
   );
}
