import { useEffect, useState } from 'react';
import classes from './Error.module.scss';

type Props = {
   message?: string
}

export default function Error({message}: Props) {
   const [activeError, setActiveError] = useState(!!message);
   useEffect(() => {
      setActiveError(!!message);
   }, [message]);
   return (
      <div className={`${classes.error} ${!!activeError ? classes.active : ''}`}>
         <p className={classes.error__text}>{message}</p>
      </div>
   );
}
