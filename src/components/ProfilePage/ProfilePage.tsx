import classes from './ProfilePage.module.scss';

import Profile from './Profile/Profile.tsx';
import PostingForm from './PostingForm/PostingForm.tsx';
import Preloader from '../Common/Preloader/Preloader.tsx';

import { useAppSelector, useAppDispatch } from '../../redux/typedHooks/hooks.ts';
import { loadUserProfile } from '../../redux/ProfileReducer.ts';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const ProfilePage = () => {
   //Реализация редиректа
   const navigate = useNavigate();

   //Создание dispatch
   const dispatch = useAppDispatch()

   //Использьзование useParams для получения id пользователя из URL
   const params = useParams();
   const userId = params.userId;

   //Получение данных из state
   const profileLoading = useAppSelector(state => state.profilePage.profileLoading);
   const id = useAppSelector(state => state.auth.id);

   //Локальное состояние указывающее на то, что это страница авторизованного на данный момент пользователя
   const [urPage, setUrPage] = useState(!userId || Number(userId) === id)

   useEffect(() => {
      if(id){
         dispatch(loadUserProfile(userId ? Number(userId) : id))
      }else{
         navigate("/login")
      }
   }, [userId, dispatch, id, navigate])

   useEffect(() => {
      setUrPage(!userId || Number(userId) === id)
   }, [userId, id])

   if (profileLoading) {
      return <Preloader color="purple" />;
   }
   return (
      <div className={classes.content}>
         <Profile urPage={urPage}/>
         {urPage && <PostingForm />}
      </div>
   );


}

export default ProfilePage;