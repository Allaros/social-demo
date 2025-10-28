import classes from './Login.module.scss';
import LoginForm from './LoginForm/LoginForm';
import WithLoginRedirect from '../../HOC/WithLoginRedirect';

function Login() {
   return (
      <section className={classes.login_page}>
         <div className={classes.login_body}>
            <h1 className={classes.login_title}>Вход</h1>
            <LoginForm />
         </div>
      </section>
   );
}

export default WithLoginRedirect(Login);
