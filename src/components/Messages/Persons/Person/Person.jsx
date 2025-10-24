import { NavLink } from 'react-router';

export default function Person({ id, name, className }) {
   return (
      <li className={className}>
         <NavLink to={`/dialogs/${id}_${name}`}>{name}</NavLink>
      </li>
   );
}
