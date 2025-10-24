import Avatar from "../img/Avatar.jpg";

const SEND_NEW_MESSAGE = "my-app/MessagesReducer/SEND-NEW-MESSAGE";

export const sendNewMessage = (message) => ({ type: SEND_NEW_MESSAGE, message });

const initialState = {
   messageMassive: [
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
};

const messagesReducer = (state = initialState, action) => {
   switch (action.type) {
      case SEND_NEW_MESSAGE:
         let date = new Date();
         let newMessage = {
            isUser: true,
            avatarImage: Avatar,
            message: action.message,
            id: 10,
            time: date.toLocaleTimeString([], {
               hour: "2-digit",
               minute: "2-digit",
            }),
         };
         if (!action.message) {
            return state;
         }

         return {
            ...state,
            messageMassive: [...state.messageMassive, newMessage],
         }
      default:
         return state;
   }
};

export default messagesReducer;
