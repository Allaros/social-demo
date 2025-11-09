import classes from './Friends.module.scss';

import Friend from './Friend/Friend.tsx';
import { useAppSelector } from '../../../redux/typedHooks/hooks.ts';

export default function Friends() {
   const friends = useAppSelector(state => state.sidebarComponent.friends);

   if(friends.length === 0){
      return
   } 

   const friendComponents = friends.map((friend) => <Friend {...friend} key={friend.id} />);

   return (
      <section className={classes.friends}>
         <h3 className={classes.friends__title}>Друзья</h3>
         <div className={classes.friends__window}>
            <div className={classes.friends__wrapper}>
               <ul className={classes.friends__list}>{friendComponents}</ul>
            </div>
         </div>
      </section>
   );
}
