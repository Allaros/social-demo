import classes from "./Button.module.scss";

export default function Button(props) {
   return (
      <div className={`${classes.buttonCont} ${props.class}`}>
         <button disabled={props.disabled} onClick={props.onClick} className={classes.button}>
            {props.children}
         </button>
      </div>
   );
}
