import classes from './Checkbox.module.scss';
import { useState } from 'react';

export default function Checkbox({ register, label, name, checked }) {
   const [isChecked, setIsChecked] = useState(checked);

   let chkChange = (e) => {
      setIsChecked((prev) => !prev);
   };

   return (
      <div className={`${classes.validatedForm__formfield}`}>
         <label className={classes.validatedForm__CheckBoxLabel} htmlFor={name}>
            <input onClick={chkChange} checked={isChecked} {...register(name)} className={classes.validatedForm__checkbox} type="checkbox" id={name} />
            <span className={`${classes.validatedForm__checkboxElement}`}></span>
            {label}
         </label>
      </div>
   );
}
