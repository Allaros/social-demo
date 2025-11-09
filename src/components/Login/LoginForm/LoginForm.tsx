import classes from './LoginForm.module.scss';

import Button from '../../Common/Button/Button.tsx';
import ValidatedFormField from '../../Common/FormField/ValidateFormField.tsx';
import Checkbox from '../../Common/FormField/Checkbox.tsx';
import { useForm } from 'react-hook-form';
import { autorizeUserThunk } from '../../../redux/AuthReducer.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/typedHooks/hooks.ts';

type Props = {
   className?: string
}

type FormDataType = {
   email: string
   password: string
   rememberMe: boolean
   captcha?: string

}

const LoginForm: React.FC<Props> = ({ className }) => {

   const dispatch = useAppDispatch();

   const errorMessage = useAppSelector(state => state.auth.errorMessage);
   const isLoading = useAppSelector(state => state.auth.isLoading);
   const captcha = useAppSelector(state => state.auth.captcha);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<FormDataType>({ mode: 'onBlur' });

   const fieldMask = {
      register,
      classes,
      errors,
   };

   const onSubmit = (data: FormDataType) => {
      dispatch(autorizeUserThunk({ ...data }));
      reset();
   };
   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)} className={`${className} ${classes.loginForm__form}`}>
            <ValidatedFormField<FormDataType>
               tag="input"
               type="email"
               {...fieldMask}
               name="email"
               isLabel="E-mail"
               rules={{ required: 'Это обязательное поле' }}
               id={'email'}
            />
            <ValidatedFormField<FormDataType>
               tag="input"
               {...fieldMask}
               name="password"
               type="password"
               isLabel="Пароль"
               rules={{ required: 'Это обязательное поле' }}
               id={'password'}
            />
            <Checkbox<FormDataType> register={register} name={'rememberMe'} label={'Запомнить меня'} />
            {!!errorMessage && <div className={classes.error}>*{errorMessage}</div>}
            {!!captcha && (
               <div className={classes.captcha}>
                  <div className={classes.captcha__img}>
                     <img src={captcha} alt="captcha" />
                  </div>
                  <ValidatedFormField<FormDataType> tag="input" type="text" {...fieldMask} name="captcha" rules={{ required: 'Это обязательное поле' }} id={'captcha'} />
               </div>
            )}
            <div className={`${classes.loginForm__formfield} ${classes.loginForm__buttonContainer}`}>
               <Button disabled={isLoading} className={classes.loginForm__button}>
                  Подтвердить
               </Button>
            </div>
         </form>
      </>
   );
}

export default LoginForm;