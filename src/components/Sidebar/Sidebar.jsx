import Friends from './Friends/Friends.jsx';

import { NavLink } from 'react-router';
import classes from './Sidebar.module.scss';

export default function Sidebar(props) {
   return (
      <section className={classes.sidebar}>
         <ul className={classes.list}>
            <li className={classes.sidebar__link}>
               <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/profile">
                  Профиль
               </NavLink>
            </li>
            <li className={classes.sidebar__link}>
               <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/dialogs">
                  Сообщения
               </NavLink>
            </li>
            <li className={classes.sidebar__link}>
               <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/users">
                  Пользователи
               </NavLink>
            </li>
            {/* <li className={classes.sidebar__link}>
               <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/news">
                  News
               </NavLink>
            </li>
            <li className={classes.sidebar__link}>
               <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/music">
                  Music
               </NavLink>
            </li> */}
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
