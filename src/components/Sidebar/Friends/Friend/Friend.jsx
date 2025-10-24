import classes from './Friend.module.scss';

import { NavLink } from 'react-router';

export default function Friend(props) {
   return (
      <NavLink style={{ width: '100%' }} to={`/dialogs/${props.id}`}>
         <li className={classes.friend}>
            <div className={classes.friend__image}>
               <img src={props.avatar} alt={`${props.name}-avatar`} />
            </div>
            <p className={classes.friend__name}>{props.name}</p>
         </li>
      </NavLink>
   );
}
