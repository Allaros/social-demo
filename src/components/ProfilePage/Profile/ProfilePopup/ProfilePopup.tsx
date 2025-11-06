import classes from './ProfilePopup.module.scss';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ValidatedFormField from '../../../Common/FormField/ValidateFormField';
import Button from '../../../Common/Button/Button.tsx';
import Checkbox from '../../../Common/FormField/Checkbox';

import { useAppDispatch, useAppSelector } from '../../../../redux/typedHooks/hooks.ts';
import { updateUserInfoThunk, UserInfoType } from '../../../../redux/ProfileReducer.ts';

type Props = {
   togglePopup: (toggle: boolean) => void
}

const ProfilePopup: React.FC<Props> = ({ togglePopup }) => {
   
   
   const [popupActiveClass, setPopupActiveClass] = useState(false);

   

   useEffect(() => {
      setPopupActiveClass(true);
   }, []);
   return (
      <div className={`${classes.veil} ${popupActiveClass && classes.active}`}>
         <div className={classes.popup}>
            <div className={classes.popup__body}>
               <div className={classes.popup__closeBtn}>
                  <button
                     onClick={() => {
                        togglePopup(false);
                        setPopupActiveClass(false);
                     }}
                     className={classes.popup__close}
                  ></button>
               </div>
               <ProfilePopupContent className={classes.popup__content} />
            </div>
         </div>
      </div>
   );
}

function ProfilePopupContent({ className }) {
   const dispatch = useAppDispatch();
   const profile = useAppSelector(state => state.profilePage.profile)
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ mode: 'onBlur' });

   const fieldMask = {
      register,
      classes,
      errors,
   };

   let onSubmit = (data: any) => {
      let userInfo: UserInfoType = {
         aboutMe: 'aboba',
         contacts: {
            facebook: data.facebook,
            github: data.github,
            instagram: data.instagram,
            vk: data.vk,
            youtube: null,
            mainLink: null,
            twitter: null,
            website: null
         },
         lookingForAJob: data.workFinder,
         lookingForAJobDescription: data.workFinderDescription,
         fullName: data.fullname,
      };
      dispatch(updateUserInfoThunk(userInfo));
      reset();
   };
   if(!profile){
      return <div>Загрузка профиля...</div>
   }
   return (
      <div className={className}>
         <h2 className={classes.popup__title}>Редактирование профиля</h2>
         <form className={classes.popup__form} onSubmit={handleSubmit(onSubmit)}>
            <ValidatedFormField
               tag="input"
               type="text"
               {...fieldMask}
               name="fullname"
               isLabel="Имя"
               rules={{ required: 'Поле не может быть пустым' }}
               id={'fullname'}
               value={profile.fullName}
            />
            <Checkbox checked={profile?.lookingForAJob} register={register} label={'Ищу работу'} name={'workFinder'} />
            <ValidatedFormField
               tag="input"
               type="text"
               {...fieldMask}
               name="workFinderDescription"
               isLabel="Что умею в разработке:"
               id={'workFinderDescription'}
               value={profile.lookingForAJobDescription}
            />
            <div className={classes.popup__contacts}>
               <ValidatedFormField
                  value={profile.contacts?.facebook}
                  tag="input"
                  type="text"
                  {...fieldMask}
                  name="facebook"
                  isLabel="Facebook"
                  id={'facebook'}
               />
               <ValidatedFormField value={profile.contacts?.github} tag="input" type="text" {...fieldMask} name="github" isLabel="GitHub" id={'github'} />
               <ValidatedFormField
                  value={profile.contacts?.instagram}
                  tag="input"
                  type="text"
                  {...fieldMask}
                  name="instagram"
                  isLabel="Instagram"
                  id={'instagram'}
               />
               <ValidatedFormField value={profile.contacts?.vk} tag="input" type="text" {...fieldMask} name="vk" isLabel="VK" id={'vk'} />
            </div>
            <Button disabled={false} className={classes.popup__confirm}>Сохранить</Button>
         </form>
      </div>
   );
}

export default ProfilePopup;