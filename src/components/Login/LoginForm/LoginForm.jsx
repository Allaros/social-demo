import classes from './LoginForm.module.scss';

import Button from '../../Common/Button/Button';
import ValidatedFormField from '../../Common/FormField/ValidateFormField';

import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { autorizeUserThunk } from '../../../redux/AuthReducer';

function LoginForm({ className, errorMessage, isLoading, autorizeUserThunk }) {
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
               isLabel="Password"
               rules={{ required: 'Это обязательное поле' }}
               id={'password'}
            />
            <div className={`${classes.loginForm__formfield}`}>
               <label className={classes.loginForm__label} htmlFor="remember">
                  <input {...register('rememberMe')} className={classes.loginForm__checkbox} type="checkbox" id="remember" />
                  <span className={`${classes.checkbox_element}`}></span>
                  Remember me
               </label>
            </div>
            {!!errorMessage && <div className={classes.error}>*{errorMessage}</div>}

            <div className={`${classes.loginForm__formfield} ${classes.loginForm__buttonContainer}`}>
               <Button disabled={isLoading} className={classes.loginForm__button}>
                  Confirm
               </Button>
            </div>
         </form>
      </>
   );
}

let mapStateToProps = (state) => ({
   errorMessage: state.auth.errorMessage,
   isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { autorizeUserThunk })(LoginForm);
