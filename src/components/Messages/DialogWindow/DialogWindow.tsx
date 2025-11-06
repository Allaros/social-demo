import Message from './Message/Message.tsx';
import { useForm } from 'react-hook-form';
import classes from './DialogWindow.module.scss';
import sendImage from '../../../img/ic_send_128_28719.png';
import Avatar from '../../../img/Avatar.jpg';

import { sendNewMessage } from '../../../redux/MessagesReducer.ts';

import { useAppDispatch, useAppSelector } from '../../../redux/typedHooks/hooks.ts';

type Props = {
   currentDialog?: number 
}

 const DialogWindow: React.FC<Props> = ({ currentDialog }) => {
   const dispatch = useAppDispatch();
   const messageMassive = useAppSelector((state) => state.messagesPage.messageMassive);
   const userId = useAppSelector((state) => state.auth.id);
   const yourPicture = useAppSelector((state) => state.auth.yourPicture);

   const dialogs = useAppSelector((state) => state.messagesPage.dialogs);
   let opponentPicture = Avatar as string | null;
   if(currentDialog !== undefined){
      const currentOpponent = dialogs.find((dialog) => dialog.id === Number(currentDialog));
      opponentPicture = currentOpponent ? currentOpponent.avatar : null;
   }
   
   const { register, handleSubmit, resetField } = useForm();

   const dialogComponents = messageMassive.map((message) => (
      <Message
         key={message.id}
         avatar={message.senderId === userId ? yourPicture || Avatar : opponentPicture || Avatar}
         addonClass={message.senderId === userId ? 'user' : ''}
         time={message.addedAt}
         name={message.senderName}
         viewed={message.viewed}
      >
         {message.body}
      </Message>
   ));


   function onSubmit(data) {
      if(currentDialog !== undefined){
         dispatch(sendNewMessage(currentDialog, data.message));
      }
      resetField('message');
   }
   if(!currentDialog){
      return <div className={classes.dialogVoid}>Выберите диалог</div>
   }
   return (
      <div className={classes.dialog}>
         <div className={classes.dialog_window}>
            <div className={classes.dialog_window__wrapper}>{dialogComponents}</div>
         </div>
         <div className={classes.dialog__interface}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.dialog__sending}>
               <input {...register('message', { required: true })} placeholder="Сообщение..." type="text" className={classes.dialog__input} />
               <button className={classes.dialog__button}>
                  <img src={sendImage} alt="send" />
               </button>
            </form>
         </div>
      </div>
   );
}

export default DialogWindow