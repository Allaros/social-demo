import classes from './Checkbox.module.scss';

export default function Checkbox({ register, label, name }) {
   return (
      <div className={`${classes.validatedForm__formfield}`}>
         <label className={classes.validatedForm__CheckBoxLabel} htmlFor={name}>
            <input {...register(name)} className={classes.validatedForm__checkbox} type="checkbox" id={name} />
            <span className={`${classes.validatedForm__checkboxElement}`}></span>
            {label}
         </label>
      </div>
   );
}
