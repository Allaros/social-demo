import DialogWindow from "./DialogWindow.jsx";

import {
   sendNewMessage,
} from "../../../redux/MessagesReducer.js";

import { connect } from "react-redux";
import Avatar from "../../../img/Avatar.jpg";
import SendImage from "../../../img/ic_send_128_28719.png";

let mapStateToProps = (state) => {
   return {
      messageMassive: state.messagesPage.messageMassive,
      messageText: state.messagesPage.messageText,
      avatar: Avatar,
      sendImage: SendImage,
   };
};



const DialogWindowContainer = connect(mapStateToProps, {sendNewMessage})(DialogWindow);

export default DialogWindowContainer;
