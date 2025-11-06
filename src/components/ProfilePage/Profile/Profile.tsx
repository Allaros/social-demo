import classes from './Profile.module.scss';
import ProfileImage from '../../../img/profile-image.webp';
import Status from './Status/Status.tsx';
import Button from '../../Common/Button/Button.tsx';

import Avatar from '../../../img/Avatar.jpg';
import editIcon from '../../../img/edit-button-svgrepo-com.svg';
import Preloader from "../../Common/Preloader/Preloader.tsx"

import { useState, useRef, useEffect, lazy } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/typedHooks/hooks.ts';


import { updateUserAvatar } from '../../../redux/ProfileReducer.ts';

const ProfilePopup = lazy(() => import('./ProfilePopup/ProfilePopup.tsx'));
type Props = {
   urPage: boolean
}

const Profile: React.FC<Props> = ({urPage}) => {
   const dispatch = useAppDispatch();

   const profile = useAppSelector(state => state.profilePage.profile);

   const [imageFile, setImageFile] = useState(null);
   const [popupActiveState, setPopupActiveState] = useState(false);
   const [bodyLock, setBodyLock] = useState(false);

   useEffect(() => {
      document.body.style.overflow = bodyLock ? 'hidden' : 'auto';
   }, [bodyLock]);

   let fileInputRef = useRef<HTMLInputElement>(null);

   let onInputFileChange = (e: any) => {
      if (e.target.files.length > 0) {
         setImageFile(e.target.files[0]);
      }
   };

   let onAvatarSave = () => {
      if(imageFile){
         dispatch(updateUserAvatar(imageFile));
      }
      if(fileInputRef.current){
         fileInputRef.current.value = '';
      }
      setImageFile(null);
   };

   let isThereInfo = (info: string | null | undefined) => {
      return info ? info :'Нет информации';
   };

   let togglePopup = (isActive: boolean) => {
      if (isActive) {
         setPopupActiveState(isActive);
         setBodyLock(true);
      } else {
         setTimeout(() => {
            setPopupActiveState(isActive);
         }, 300);
         setBodyLock(false);
      }
   };
   if(!profile){
      return <Preloader />
   }
   return (
      <>
         <div className={classes.profile_image}>
            <img src={ProfileImage} alt="profile-image" />
         </div>
         <div className={classes.profile}>
            <div className={classes.avatar}>
               <div className={classes.avatar__photo}>
                  <img src={profile.photos?.large || Avatar} alt="avatar" />
               </div>
               {urPage ? (
                  <div className={classes.avatar__inputContainer}>
                     <input ref={fileInputRef} onChange={onInputFileChange} id="avatar-input" className={classes.avatar__input} type="file" />
                     <div className={classes.avatar__buttonContainer}>
                        <label className={classes.avatar__button} htmlFor="avatar-input">
                           Загрузить фото
                        </label>
                        <Button disabled={false} onClick={onAvatarSave} className={`${classes.avatar__save} ${!!imageFile ? classes.choosed : null}`}>
                           Сохранить
                        </Button>
                     </div>
                  </div>
               ) : null}
            </div>
            <div className={classes.info}>
               <div className={classes.name}>
                  {profile.fullName}{' '}
                  <button
                     onClick={() => {
                        togglePopup(true);
                     }}
                     className={classes.editImage}
                  >
                     <img src={editIcon} alt="edit icon" />
                  </button>
               </div>
               <Status className={classes.user__status} />
               <div className={classes.jobSearch}>
                  <p>{profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</p>
                  <p>{profile.lookingForAJobDescription}</p>
               </div>
               <ul className={classes.contacts__list}>
                  <li className={classes.user_info}>Facebook: {isThereInfo(profile.contacts?.facebook)}</li>
                  <li className={classes.user_info}>GitHub: {isThereInfo(profile.contacts?.github)}</li>
                  <li className={classes.user_info}>Instagram: {isThereInfo(profile.contacts?.instagram)}</li>
                  <li className={classes.user_info}>VK: {isThereInfo(profile.contacts?.vk)}</li>
               </ul>
            </div>
         </div>
         {popupActiveState ? (
            <ProfilePopup togglePopup={togglePopup} />
         ) : null}
      </>
   );
}


export default Profile