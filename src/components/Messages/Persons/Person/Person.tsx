import { NavLink } from 'react-router';
import Avatar from '../../../../img/Avatar.jpg';

import classes from './Person.module.scss';

type Props = {
   id: number
   name: string
   avatar: string | null
}

const Person: React.FC<Props> = ({ id, name, avatar }) => {
   return (
      <li className={classes.person}>
         <NavLink className={({ isActive }) => (isActive ? `${classes.person__link} ${classes.active}` : classes.person__link)} to={`/dialogs/${id}`}>
            <div className={classes.person__avatar}>
               <img src={avatar || Avatar} alt="" />
            </div>
            <p>{name}</p>
         </NavLink>
      </li>
   );
}

export default Person
