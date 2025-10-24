import classes from './User.module.scss';
import Button from '../../Common/Button/Button';
import { NavLink } from 'react-router';

export default function User({ id, avatar, name, status, toggleFollow, followed, followingInLoad }) {
   return (
      <li className={classes.user}>
         <div className={classes.user__visual}>
            <div className={classes.user__picture}>
               <NavLink to={`/profile/${id}`}>
                  <img src={avatar} alt="avatar" />
               </NavLink>
            </div>
         </div>
         <div className={classes.user__description}>
            <div className={classes.user__descriptionBlock}>
               <p className={classes.user__name}>{name}</p>
               {!!status ? <p className={classes.user__status}>{status}</p> : null}
            </div>
         </div>
         <Button
            onClick={() => toggleFollow(id, followed)}
            disabled={followingInLoad.some((userId) => userId === id)}
            class={`${classes.button} ${followed ? classes.follow : ''}`}
         >
            {followed ? 'Unfollow' : 'Follow'}
         </Button>
      </li>
   );
}
