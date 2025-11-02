import classes from './LoginForm.module.scss';

import Button from '../../Common/Button/Button';
import ValidatedFormField from '../../Common/FormField/ValidateFormField';
import Checkbox from '../../Common/FormField/Checkbox.jsx';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { autorizeUserThunk } from '../../../redux/AuthReducer.ts';
import { useState, useEffect } from 'react';

function LoginForm({ className, errorMessage, isLoading, autorizeUserThunk, captcha }) {
   const [isCaptcha, setIsCaptcha] = useState(!!captcha);
   useEffect(() => {
      setIsCaptcha(!!captcha);
   }, [captcha]);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ mode: 'onBlur' });

   const fieldMask = {
      register,
      classes,
      errors,
   };

   const onSubmit = (data) => {
      autorizeUserThunk({ ...data });
      reset();
   };
   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)} className={`${className} ${classes.loginForm__form}`}>
            <ValidatedFormField
               tag="input"
               type="email"
               {...fieldMask}
               name="email"
               isLabel="E-mail"
               rules={{ required: 'Это обязательное поле' }}
               id={'email'}
            />
            <ValidatedFormField
               tag="input"
               {...fieldMask}
               name="password"
               type="password"
               isLabel="Пароль"
               rules={{ required: 'Это обязательное поле' }}
               id={'password'}
            />
            <Checkbox register={register} name={'remember me'} label={'Запомнить меня'} />
            {!!errorMessage && <div className={classes.error}>*{errorMessage}</div>}
            {isCaptcha && (
               <div className={classes.captcha}>
                  <div className={classes.captcha__img}>
                     <img src={captcha} alt="captcha" />
                  </div>
                  <ValidatedFormField tag="input" type="text" {...fieldMask} name="captcha" rules={{ required: 'Это обязательное поле' }} id={'captcha'} />
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

let mapStateToProps = (state) => ({
   errorMessage: state.auth.errorMessage,
   isLoading: state.auth.isLoading,
   captcha: state.auth.captcha,
});

export default connect(mapStateToProps, { autorizeUserThunk })(LoginForm);
