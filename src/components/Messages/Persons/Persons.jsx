import classes from "./Persons.module.scss";
import Person from "./Person/Person";

export default function Persons(props) {
    const personComponents = props.personInfo.map((person) => (
      <Person
         key={person.id}
         className={classes.people__item}
         name={person.name}
         id={person.id}
      />
   ));
   return (
      <div className={classes.people}>
         <div className={classes.people__title}>Messages</div>
         <div className={classes.people__window}>
            <div className={classes.people__wrapper}>
               <ul className={classes.people__list}>{personComponents}</ul>
            </div>
         </div>
      </div>
   );
}
