import { FriendType } from '../../../../redux/SidebarReducer.ts';
import classes from './Friend.module.scss';

import { NavLink } from 'react-router';



 const Friend: React.FC<FriendType> = ({avatar, id, name}) => {
   return (
      <NavLink style={{ width: '100%' }} to={`/dialogs/${id}`}>
         <li className={classes.friend}>
            <div className={classes.friend__image}>
               <img src={avatar} alt={`${name}-avatar`} />
            </div>
            <p className={classes.friend__name}>{name}</p>
         </li>
      </NavLink>
   );
}
export default Friend