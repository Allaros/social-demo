import DialogWindow from './DialogWindow/DialogWindow.jsx';
import classes from './Messages.module.scss';

import WithAuthRedirect from '../../HOC/WithAuthRedirect.jsx';

import { useAppDispatch } from '../../redux/typedHooks/hooks.ts';
import { chooseDialog, getDialogs } from '../../redux/MessagesReducer.ts';

import { useEffect } from 'react';
import Persons from './Persons/Persons.jsx';
import { useParams } from 'react-router';

function Messages() {
   const dispatch = useAppDispatch();

   const params = useParams();

   useEffect(() => {
      dispatch(getDialogs());
   }, [dispatch]);

   useEffect(() => {
      if (params.userId) {
         dispatch(chooseDialog(Number(params.userId)));
      }
   }, [dispatch, params]);

   return (
      <section className={classes.messages}>
         <Persons />
         <DialogWindow currentDialog={Number(params.userId)} />
      </section>
   );
}

export default WithAuthRedirect(Messages);
