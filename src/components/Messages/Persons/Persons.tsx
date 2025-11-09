import classes from './Persons.module.scss';
import Person from './Person/Person.tsx';

import { useAppSelector } from '../../../redux/typedHooks/hooks';



 const Persons: React.FC = () => {
   const dialogs = useAppSelector((state) => state.messagesPage.dialogs);

   const personComponents = dialogs.map((person) => (
      <Person key={person.id} name={person.name} id={person.id} avatar={person.avatar} />
   ));
   return (
      <div className={classes.people}>
         <div className={classes.people__title}>Диалоги</div>
         <div className={classes.people__window}>
            <div className={classes.people__wrapper}>
               <ul className={classes.people__list}>{personComponents}</ul>
            </div>
         </div>
      </div>
   );
}


export default Persons