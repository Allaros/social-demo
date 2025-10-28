import classes from './ProfilePopup.module.scss';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ValidatedFormField from '../../../Common/FormField/ValidateFormField';
import Button from '../../../Common/Button/Button';
import Checkbox from '../../../Common/FormField/Checkbox';

export default function ProfilePopup({ togglePopup, profile, ...props }) {
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
               <ProfilePopupContent updateUserInfoThunk={props.updateUserInfoThunk} profile={profile} className={classes.popup__content} />
            </div>
         </div>
      </div>
   );
}

function ProfilePopupContent({ profile, ...props }) {
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

   let onSubmit = (data) => {
      let userInfo = {
         aboutMe: 'aboba',
         contacts: {
            facebook: data.facebook,
            github: data.github,
            instagram: data.instagram,
            mailLink: data.email,
            vk: data.vk,
         },
         lookingForAJob: data.workFinder,
         lookingForAJobDescription: data.workFinderDescription,
         fullName: data.fullname,
      };
      props.updateUserInfoThunk(userInfo);
      reset();
   };
   return (
      <div className={props.className}>
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
            <Checkbox register={register} label={'Ищу работу'} name={'workFinder'} />
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
                  value={profile.contacts.facebook}
                  tag="input"
                  type="text"
                  {...fieldMask}
                  name="facebook"
                  isLabel="Facebook"
                  id={'facebook'}
               />
               <ValidatedFormField value={profile.contacts.github} tag="input" type="text" {...fieldMask} name="github" isLabel="GitHub" id={'github'} />
               <ValidatedFormField
                  value={profile.contacts.instagram}
                  tag="input"
                  type="text"
                  {...fieldMask}
                  name="instagram"
                  isLabel="Instagram"
                  id={'instagram'}
               />
               <ValidatedFormField value={profile.contacts.mailLink} tag="input" type="text" {...fieldMask} name="email" isLabel="Email" id={'email'} />
               <ValidatedFormField value={profile.contacts.vk} tag="input" type="text" {...fieldMask} name="vk" isLabel="VK" id={'vk'} />
               <ValidatedFormField
                  value={profile.contacts.whatsApp}
                  tag="input"
                  type="text"
                  {...fieldMask}
                  name="whatsApp"
                  isLabel="WhatsApp"
                  id={'whatsApp'}
               />
            </div>
            <Button class={classes.popup__confirm}>Сохранить</Button>
         </form>
      </div>
   );
}
