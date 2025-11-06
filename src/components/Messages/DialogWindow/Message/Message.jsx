import classes from './Message.module.scss';

export default function Message({ avatar, addonClass, time, name, children }) {
   return (
      <div className={`${classes.message} ${classes[addonClass]}`}>
         <div className={classes.message__image}>
            <img src={avatar} alt="author-pic" />
         </div>
         <div className={classes.message__text}>
            <p className={classes.message__author}>{name}</p>
            <p className={classes.message__content}>{children}</p>
            <p className={classes.message__time}>{time}</p>
         </div>
      </div>
   );
}
