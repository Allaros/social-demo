import Logo from '../../img/logo.png';

import classes from './Header.module.scss';
import Avatar from '../../img/Avatar.jpg';

import { NavLink } from 'react-router';
import { connect } from 'react-redux';
import { getUserDataThunk, logoutUserThunk } from '../../redux/AuthReducer.js';

function Header(props) {
   let LinkName = !!props.userData.isAuth ? (
      <li>
         <NavLink to="/profile">{props.userData.login}</NavLink>
      </li>
   ) : (
      <li>
         <NavLink to="/login">Sign in</NavLink>
      </li>
   );
   let Logout = !!props.userData.isAuth ? (
      <li>
         <button onClick={props.logoutUserThunk}>Logout</button>
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
                  {props.isLoading ? '' : Logout}
                  {props.isLoading ? '' : LinkName}
               </ul>
            </nav>
            <div className={classes.lk}>
               <img src={Avatar} alt="" />
            </div>
         </div>
      </header>
   );
}

let mapStateToProps = (state) => {
   return {
      userData: state.auth,
   };
};

export default connect(mapStateToProps, { getUserDataThunk, logoutUserThunk })(Header);
