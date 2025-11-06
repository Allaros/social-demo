import classes from './Users.module.scss';
import User from './User/User.tsx';
import Preloader from '../Common/Preloader/Preloader.tsx';
import Pagination from '../Common/Pagination/Pagination';
import Avatar from '../../img/Avatar.jpg';
import { useAppSelector, useAppDispatch } from '../../redux/typedHooks/hooks';
import { useEffect } from 'react';
import { getUsersPage } from '../../redux/UsersReducer.ts';

const Users: React.FC = () => {
   const dispatch = useAppDispatch();

   const users = useAppSelector(state => state.usersPage.users);
   const isFetching = useAppSelector(state => state.usersPage.isFetching);
   const currentPage = useAppSelector(state => state.usersPage.currentPage);
   const pageSize = useAppSelector(state => state.usersPage.pageSize);

   useEffect(() => {
      dispatch(getUsersPage(currentPage, pageSize));
   }, [dispatch, currentPage, pageSize])

   let usersComponents = users.map((user) => (
      <User
         name={user.name}
         key={user.id}
         id={user.id}
         avatar={user.photos.small || Avatar}
         status={user.status}
         followed={user.followed}
      />
   ));
   return (
      <section className={classes.users}>
         <div className={classes.users__top}>
            <h2 className={classes.users__title}>Пользователи</h2>
         </div>
         <div className={classes.users__searchBlock}>
            <input className={classes.users__search} type="text" name="" id="" />
         </div>
         <div className={classes.users__pagination}>
            <Pagination className={classes.users__pagination} currentPage={currentPage}/>
         </div>
         <div className={classes.users__content}>
            {isFetching ? <Preloader color="green" /> : <ul className={classes.users__list}>{usersComponents}</ul>}
         </div>
      </section>
   );
}

export default Users;