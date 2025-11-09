import { useState, useEffect, ChangeEvent } from 'react';
import classes from './Status.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../redux/typedHooks/hooks';
import { updateUserStatus } from '../../../../redux/ProfileReducer';

type Props = {
   className: string
}

const Status: React.FC<Props> = ({className}) => {
   const dispatch = useAppDispatch()

   const storeStatus = useAppSelector(state => state.profilePage.status); 

   const [status, setStatus] = useState(storeStatus);
   const [editMode, setEditMode] = useState(false);

   useEffect(() => {
      setStatus(storeStatus);
   }, [storeStatus]);

   let activateEditMode = () => {
      setEditMode(true);
   };

   let deactivateEditMode = () => {
      setEditMode(false);
      if (storeStatus !== status) {
         dispatch(updateUserStatus(status));
      }
   };

   let onStatusChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setStatus(e.currentTarget.value);
   };
   return (
      <div className={className}>
         {storeStatus ? 
                  <div className={classes.status}>
            {!editMode ? (
               <div className={classes.status__string}>
                  <span onClick={activateEditMode}>{status}</span>
               </div>
            ) : (
               <div className={classes.status__input}>
                  <textarea onChange={onStatusChange} autoFocus={true} onBlur={() => deactivateEditMode()} value={status} />
               </div>
            )}
         </div> : 
         null
         }

      </div>
   );
}

export default Status;
