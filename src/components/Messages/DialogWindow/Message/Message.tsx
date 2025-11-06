import classes from './Message.module.scss';

export default function Message({ avatar, addonClass, time, name, children, viewed }) {
   return (
      <div className={`${classes.message} ${classes[addonClass]}`}>
         <div className={classes.message__image}>
            <img src={avatar} alt="author-pic" />
         </div>
         <div className={classes.message__body}>
            <p className={classes.message__author}>{name}</p>
            <p className={classes.message__text}>{children}</p>
            <div className={classes.message__status}>
               <p className={classes.message__time}>{time}</p>
               <p className={`${classes.message__check} ${viewed && classes.checked}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                     <path fill='#fff' d="M9 19.4L3.3 13.7 4.7 12.3 9 16.6 20.3 5.3 21.7 6.7z"></path>
                  </svg>
               </p>
               </div>

         </div>
      </div>
   );
}
