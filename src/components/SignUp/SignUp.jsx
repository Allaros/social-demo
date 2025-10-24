import classes from "./SignUp.module.scss";
import Button from "../Common/Button/Button";
export default function SignUp(){
    return(
        <section className={classes.SignUp_page}>
            <div className={classes.SignUp_body}>
                <h1 className={classes.SignUp_title}>Registration</h1>
                <form action="" className={classes.SignUp__form}>
                    <div className={classes.SignUp__formfield}>
                        <label className={classes.SignUp__label} htmlFor="email">Email</label>
                        <input className={classes.SignUp__input} type="text" name="" id="email" />
                    </div>
                    <div className={classes.SignUp__formfield}>
                        <label className={classes.SignUp__label} htmlFor="password">Password</label>
                        <input className={classes.SignUp__input} type="text" name="" id="password" />
                    </div>
                    <div className={classes.SignUp__formfield}>
                        <label className={classes.SignUp__label} htmlFor="password-repeat">Repeat your password</label>
                        <input className={classes.SignUp__input} type="text" name="" id="password-repeat" />
                    </div>
                    <Button className={classes.SignUp__button}>Confirm</Button>
                </form>
            </div>
        </section>
    )
}