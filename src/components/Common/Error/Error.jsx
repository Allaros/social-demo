import { useEffect, useState } from 'react';
import classes from './Error.module.scss';

export default function Error(props) {
   const [activeError, setActiveError] = useState(!!props.message);
   useEffect(() => {
      setActiveError(!!props.message);
   }, [props.message]);
   return (
      <div className={`${classes.error} ${!!activeError ? classes.active : ''}`}>
         <p className={classes.error__text}>{props.message}</p>
      </div>
   );
}
