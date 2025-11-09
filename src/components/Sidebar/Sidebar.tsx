import Friends from './Friends/Friends.tsx';

import { NavLink } from 'react-router';
import classes from './Sidebar.module.scss';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/typedHooks/hooks.ts';
import { getNewMessages } from '../../redux/MessagesReducer.ts';

const Sidebar: React.FC = () => {

   const dispatch = useAppDispatch();
   const count = useAppSelector((state) => state.messagesPage.newMessagesCount);
   const isAuth = useAppSelector((state) => state.auth.isAuth);
   useEffect(() => {
      if (isAuth) {
         dispatch(getNewMessages());

         const intervalId = setInterval(() => {
            dispatch(getNewMessages());
         }, 10000);

         return () => {
            clearInterval(intervalId);
         };
      }
   }, [dispatch, count, isAuth]);

   return (
      <section className={classes.sidebar}>
         <ul className={classes.list}>
            <li className={classes.sidebar__link}>
               <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/profile">
                  Профиль
               </NavLink>
            </li>
            <li className={`${classes.sidebar__link} ${classes.sidebar__messagesCount}`}>
               <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/dialogs">
                  Сообщения
               </NavLink>
               <p className={`${classes.count} ${count > 0 ? classes.active : ''}`}>{count}</p>
            </li>
            <li className={classes.sidebar__link}>
               <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/users">
                  Пользователи
               </NavLink>
            </li>
         </ul>
         <div className={classes.other}>
            <p>
               <button>Настройки</button>
            </p>
         </div>

         <Friends></Friends>
      </section>
   );
}

export default Sidebar;