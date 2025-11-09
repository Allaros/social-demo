import Avatar from "../img/Avatar.jpg";
import SendImage from "../img/ic_send_128_28719.png";
import andrewAvatar from "../img/Andrew-avatar.jpg";
import ekaterinaAvatar from "../img/Ekaterina-avatar.jpg";
import oksanaAvatar from "../img/Oksana-avatar.png";

import sidebarReduser from "./SidebarReducer";
import messagesReduser from "./MessagesReducer";
import profileReduser from "./ProfileReducer";
let store = {
   _state: {
      profilePage: {
         postInfo: [
            {
               postText:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, libero.",
               postImage: Avatar,
               id: 1,
               time: "19:21",
            },
            {
               postText:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, provident.",
               postImage: Avatar,
               id: 2,
               time: "19:22",
            },
            {
               postText:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, dolore?",
               postImage: Avatar,
               id: 3,
               time: "19:23",
            },
            {
               postText:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, libero.",
               postImage: Avatar,
               id: 4,
               time: "19:24",
            },
         ],
         newPostText: "react project",
      },
      messagesPage: {
         messageMassive: [
            {
               isUser: true,
               avatarImage: Avatar,
               message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
               modi quos dolore est. Voluptatum rem, illo porro, nam enim, earum
               distinctio iste quo aliquid tempore reiciendis nesciunt vero
               animi deleniti.`,
               id: 1,
               time: "19:21",
            },
            {
               isUser: false,
               avatarImage: Avatar,
               message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
               doloremque et illo obcaecati! Dolores minima eveniet saepe
               obcaecati, id illum suscipit distinctio molestias temporibus
               facere vero fugiat dicta quibusdam. Maxime.`,
               id: 2,
               time: "19:22",
            },
            {
               isUser: true,
               avatarImage: Avatar,
               message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
               doloremque et illo obcaecati! Dolores minima eveniet saepe
               obcaecati, id illum suscipit distinctio molestias temporibus
               facere vero fugiat dicta quibusdam. Maxime.`,
               id: 3,
               time: "19:23",
            },
            {
               isUser: false,
               avatarImage: Avatar,
               message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
               doloremque et illo obcaecati! Dolores minima eveniet saepe
               obcaecati, id illum suscipit distinctio molestias temporibus
               facere vero fugiat dicta quibusdam. Maxime.`,
               id: 4,
               time: "19:24",
            },
            {
               isUser: false,
               avatarImage: Avatar,
               message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
               doloremque et illo obcaecati! Dolores minima eveniet saepe
               obcaecati, id illum suscipit distinctio molestias temporibus
               facere vero fugiat dicta quibusdam. Maxime.`,
               id: 5,
               time: "19:25",
            },
         ],
         personInfo: [
            {
               id: "34gs",
               name: "Andrew",
            },
            {
               id: "8iuh",
               name: "Dmitriy",
            },
            {
               id: "5dfh",
               name: "Vitaliy",
            },
            {
               id: "7cvb",
               name: "Ekaterina",
            },
            {
               id: "8fj3",
               name: "Oksana",
            },
         ],
         messageText: "",
      },
      sidebarComponent: {
         friends: [
            {
               name: "Andrew",
               id: "34gs",
               avatar: andrewAvatar,
            },
            {
               name: "Ekaterina",
               id: "7cvb",
               avatar: ekaterinaAvatar,
            },
            {
               name: "Oksana",
               id: "8fj3",
               avatar: oksanaAvatar,
            },
         ],
      },

      avatarImage: Avatar,
      sendImage: SendImage,
   },
   getState() {
      return this._state;
   },
   _callsubscriber() {
      console.log("rerender");
   },
   subscribe(observer) {
      this._callsubscriber = observer;
   },


   dispatch(action) {
      this._state.profilePage = profileReduser(this._state.profilePage, action);
      this._state.messagesPage = messagesReduser(this._state.messagesPage, action);
      this._state.sidebarComponent = sidebarReduser(this._state.sidebarComponent, action);
      this._callsubscriber();
   },
};




export default store;
window.store = store;
