import { UseFormRegister, FieldValues, Path, RegisterOptions, FieldErrors } from 'react-hook-form';
import classes from './Checkbox.module.scss';

type TFormValues = FieldValues;

interface Props<TFieldValues extends TFormValues> {
   name: Path<TFieldValues>
   register: UseFormRegister<TFieldValues>
   rules?: RegisterOptions<TFieldValues>
   errors?: FieldErrors<TFieldValues>

   label: string
}

const Checkbox = <TFieldValues extends TFormValues> ({ register, label, name }: Props<TFieldValues>) => {

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

export default Checkbox