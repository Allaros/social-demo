import classes from "./Message.module.scss";

export default function Message(props) {

   return (
      <div className={`${classes.message} ${classes[props.addonClass]}`}>
         <div className={classes.message__image}>
            <img src={props.Avatar} alt="author-pic" />
         </div>
         <div className={classes.message__text}>
            <p className={classes.message__author}>{props.addonClass === "user" ? "Me" : "Andrew"}</p>
            <p className={classes.message__content}>
               {props.children}
            </p>
            <p className={classes.message__time}>{props.time}</p>
         </div>
      </div>
   );
}
