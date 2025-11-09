import classes from './ProfilePopup.module.scss';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ValidatedFormField from '../../../Common/FormField/ValidateFormField.tsx';
import Button from '../../../Common/Button/Button.tsx';
import Checkbox from '../../../Common/FormField/Checkbox.tsx';

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

   type FormDataType = {
      fullname: string
      workFinder: boolean
      facebook: string | null
      github: string | null
      instagram: string| null
      vk: string | null
      workFinderDescription: string | null
   }

function ProfilePopupContent({ className }) {
   const dispatch = useAppDispatch();
   const profile = useAppSelector(state => state.profilePage.profile)
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<FormDataType>({ mode: 'onBlur' });

   const fieldMask = {
      register,
      classes,
      errors,
   };


   useEffect(() => {
      if(profile){
         reset({
            fullname: profile.fullName,
            workFinder: profile.lookingForAJob,
            workFinderDescription: profile.lookingForAJobDescription,
            facebook: profile.contacts.facebook,
            github: profile.contacts.github,
            instagram: profile.contacts.instagram,
            vk: profile.contacts.vk
         })
      }
   }, [profile, reset])


   let onSubmit = (data: FormDataType) => {
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
            <ValidatedFormField<FormDataType>
               tag="input"
               type="text"
               {...fieldMask}
               name="fullname"
               isLabel="Имя"
               rules={{ required: 'Поле не может быть пустым' }}
               id={'fullname'}
            />
            <Checkbox register={register} label={'Ищу работу'} name={'workFinder'} />
            <ValidatedFormField<FormDataType>
               tag="input"
               type="text"
               {...fieldMask}
               name="workFinderDescription"
               isLabel="Что умею в разработке:"
               id={'workFinderDescription'}
            />
            <div className={classes.popup__contacts}>
               <ValidatedFormField<FormDataType>
                  tag="input"
                  type="text"
                  {...fieldMask}
                  name="facebook"
                  isLabel="Facebook"
                  id={'facebook'}
               />
               <ValidatedFormField<FormDataType> tag="input" type="text" {...fieldMask} name="github" isLabel="GitHub" id={'github'} />
               <ValidatedFormField<FormDataType>
                  tag="input"
                  type="text"
                  {...fieldMask}
                  name="instagram"
                  isLabel="Instagram"
                  id={'instagram'}
               />
               <ValidatedFormField<FormDataType> tag="input" type="text" {...fieldMask} name="vk" isLabel="VK" id={'vk'} />
            </div>
            <Button disabled={false} className={classes.popup__confirm}>Сохранить</Button>
         </form>
      </div>
   );
}

export default ProfilePopup;