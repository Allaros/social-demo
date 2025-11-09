import classes from './Messages.module.scss';

import WithAuthRedirect from '../../HOC/WithAuthRedirect.jsx';

import { useAppDispatch } from '../../redux/typedHooks/hooks.ts';
import { loadDialog, getDialogs } from '../../redux/MessagesReducer.ts';

import { lazy, useEffect } from 'react';
import Persons from './Persons/Persons.tsx';
import { useParams } from 'react-router';

const DialogWindow = lazy(() => import('./DialogWindow/DialogWindow.tsx'));

const Messages: React.FC = () => {
   
   const dispatch = useAppDispatch();

   const params = useParams();

   useEffect(() => {
      dispatch(getDialogs());
   }, [dispatch]);

   useEffect(() => {
      if (params.userId) {
         dispatch(loadDialog(Number(params.userId)));
      }
   }, [dispatch, params]);
   return (
      <section className={classes.messages}>
         <Persons/>
         <DialogWindow currentDialog={Number(params.userId)} />
      </section>
   );
}

export default WithAuthRedirect(Messages);
