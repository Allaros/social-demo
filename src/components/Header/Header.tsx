import Logo from '../../img/logo.png';

import classes from './Header.module.scss';
import Avatar from '../../img/Avatar.jpg';

import { NavLink } from 'react-router';
import { logoutUserThunk } from '../../redux/AuthReducer.ts';

import { useAppDispatch, useAppSelector } from '../../redux/typedHooks/hooks.ts';

const Header: React.FC = () => {
   const dispatch = useAppDispatch();
   const userData = useAppSelector(state => state.auth)

   let handleOnClick = () => {
      
      dispatch(logoutUserThunk())
   }

   let LinkName = !!userData.isAuth ? (
      <li>
         <NavLink to="/profile">{userData.login}</NavLink>
      </li>
   ) : (
      <li>
         <NavLink to="/login">Войти</NavLink>
      </li>
   );
   let Logout = !!userData.isAuth ? (
      <li>
         <button onClick={handleOnClick}>Выйти</button>
      </li>
   ) : null;
   return (
      <header className={classes.header}>
         <div className={classes.header__container}>
            <div className={classes.logo}>
               <img src={Logo} alt="logo" />
            </div>
            <nav className={classes.navbar}>
               <ul className={classes.list}>
                  {userData.isLoading ? '' : Logout}
                  {userData.isLoading ? '' : LinkName}
               </ul>
            </nav>
            <div className={classes.lk}>
               <img src={userData.yourPicture || Avatar} alt="" />
            </div>
         </div>
      </header>
   );
}

export default Header