import classes from './User.module.scss';
import Button from '../../Common/Button/Button.tsx';
import { NavLink } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../redux/typedHooks/hooks';
import { followUserThunk } from '../../../redux/UsersReducer';
import { startDialog } from '../../../redux/MessagesReducer.ts';

type Props = {
   id: number
   avatar: string
   name: string
   status: string | undefined
   followed: boolean
}

const User: React.FC<Props> = ({ id, avatar, name, status, followed }) => {

   const dispatch = useAppDispatch();

   const followingInProgress = useAppSelector(state => state.usersPage.followingInProgress);

   const startChatting = (id: number) => {
      dispatch(startDialog(id))
   }

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
         <div className={classes.user__buttons}>
            <Button
            onClick={() => dispatch(followUserThunk(id, followed))}
            disabled={followingInProgress.some((userId) => userId === id)}
            className={`${classes.button} ${followed ? classes.follow : ''}`}
         >
            {followed ? 'Отписаться' : 'Подписаться'}
         </Button>
         <Button onClick={() => startChatting(id)} disabled={false} className={classes.button} >{"Сообщение"}</Button>
         </div>

      </li>
   );
}

export default User;