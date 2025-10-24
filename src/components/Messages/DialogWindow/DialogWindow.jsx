import Message from "./Message/Message.jsx";
import {useForm} from 'react-hook-form';
import classes from "./DialogWindow.module.scss";


export default function DialogWindow(props) {

   const {register, handleSubmit, resetField} = useForm();

   const dialogComponents = props.messageMassive.map((message) => (
      <Message
         key={message.id}
         addonClass={message.isUser ? "user" : ""}
         Avatar={props.avatar}
         time = {message.time}
      >  
         {message.message}
      </Message>
   ));

   function onSubmit(data){
      props.sendNewMessage(data.message);
      resetField("message")
   }
   return (
      <div className={classes.dialog}>
         <div className={classes.dialog_window}>
            <div className={classes.dialog_window__wrapper}>
               {dialogComponents}
            </div>
         </div>
         <div className={classes.dialog__interface}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.dialog__sending}>
               <input
                  {...register("message", {required: true})}
                  placeholder="Сообщение..."
                  type="text"
                  className={classes.dialog__input}
               />
               <button className={classes.dialog__button}>
                  <img src={props.sendImage} alt="send" />
               </button>
            </form>
            
         </div>
      </div>
   );
}

