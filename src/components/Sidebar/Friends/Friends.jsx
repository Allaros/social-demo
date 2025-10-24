import classes from "./Friends.module.scss";

import Friend from "./Friend/Friend.jsx";



export default function Friends(props) {
   const friendComponents = props.friendsData.map(friend => <Friend {...friend} key={friend.id} />)

   return (
      <section className={classes.friends}>
         <h3 className={classes.friends__title}>Friends</h3>
         <div className={classes.friends__window}>
            <div className={classes.friends__wrapper}>
               <ul className={classes.friends__list}>
                  {friendComponents}
               </ul>
            </div>
         </div>
      </section>
   );
}
