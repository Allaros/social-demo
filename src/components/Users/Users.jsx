import classes from './Users.module.scss';
import User from './User/User';
import Preloader from '../Common/Preloader/Preloader';
import Pagination from '../Common/Pagination/Pagination';

export default function Users(props) {
   let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
   let usersComponents = props.users.map((user) => (
      <User
         name={user.name}
         key={user.id}
         id={user.id}
         avatar={user.photos.small || props.avatar}
         status={user.status}
         followed={user.followed}
         followingInLoad={props.followingInProgress}
         toggleFollowing={props.toggleFollowing}
         toggleFollow={props.followUserThunk}
      />
   ));
   return (
      <section className={classes.users}>
         <div className={classes.users__top}>
            <h2 className={classes.users__title}>Users</h2>
         </div>
         <div className={classes.users__searchBlock}>
            <input className={classes.users__search} type="text" name="" id="" />
         </div>
         <div className={classes.users__pagination}>
            <Pagination
               className={classes.users__pagination}
               updateUsersPage={props.updateUsersPage}
               currentPage={props.currentPage}
               pagesCount={pagesCount}
               paginationLength={props.pageSize}
            />
         </div>
         <div className={classes.users__content}>
            {props.isFetching ? <Preloader color="green" /> : <ul className={classes.users__list}>{usersComponents}</ul>}
         </div>
      </section>
   );
}
