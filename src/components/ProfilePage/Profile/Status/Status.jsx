import { useState, useEffect } from 'react';
import classes from './Status.module.scss';

function Status(props) {
   const [status, setStatus] = useState(props.status);
   const [editMode, setEditMode] = useState(false);

   useEffect(() => {
      setStatus(props.status);
   }, [props.status]);

   let activateEditMode = () => {
      setEditMode(true);
   };

   let deactivateEditMode = () => {
      setEditMode(false);
      if (props.status !== status) {
         props.updateUserStatus(status);
      }
   };

   let onStatusChange = (e) => {
      setStatus(e.currentTarget.value);
   };
   return (
      <div className={props.className}>
         <div className={classes.status}>
            {!editMode ? (
               <div className={classes.status__string}>
                  <span onClick={activateEditMode}>{status}</span>
               </div>
            ) : (
               <div className={classes.status__input}>
                  <textarea onChange={onStatusChange} autoFocus={true} onBlur={(e) => deactivateEditMode(e)} value={status} type="text" />
               </div>
            )}
         </div>
      </div>
   );
}

export default Status;
