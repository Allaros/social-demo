import classes from "./Login.module.scss";
import LoginForm from "./LoginForm/LoginForm";
import WithLoginRedirect from "../../HOC/WithLoginRedirect";

function Login(){
    return(
        <section className={classes.login_page}>
            <div className={classes.login_body}>
                <h1 className={classes.login_title}>Sign in</h1>
                <LoginForm className={""}/>
            </div>
        </section>
    )
}

export default WithLoginRedirect(Login);