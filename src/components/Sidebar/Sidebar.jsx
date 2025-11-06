import Friends from './Friends/Friends.jsx';

import { NavLink } from 'react-router';
import classes from './Sidebar.module.scss';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/typedHooks/hooks.ts';
import { getNewMessages } from '../../redux/MessagesReducer.ts';

export default function Sidebar(props) {
   const dispatch = useAppDispatch();
   const count = useAppSelector((state) => state.messagesPage.newMessagesCount);
   useEffect(() => {
      dispatch(getNewMessages());

      const intervalId = setInterval(() => {
         dispatch(getNewMessages());
      }, 10000);

      return () => {
         clearInterval(intervalId); // Очищаем интервал, чтобы избежать утечек памяти и лишних запросов
      };
   }, [dispatch, count]);

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

         {props.friends.length !== 0 && <Friends friendsData={props.friends}></Friends>}
      </section>
   );
}
