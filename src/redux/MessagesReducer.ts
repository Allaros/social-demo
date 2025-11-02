import Avatar from "../img/Avatar.jpg";

//Actions

const SEND_NEW_MESSAGE: string = "my-app/MessagesReducer/SEND-NEW-MESSAGE";

type sendMessageType = {
   type: typeof SEND_NEW_MESSAGE
   message: string
}

type MessagesActionType = sendMessageType;

export const sendNewMessage = (message: string ): sendMessageType => ({ type: SEND_NEW_MESSAGE, message });

//Reducer

type Message = {
   isUser: boolean
   avatarImage: string | null
   message: string
   id: number
   time: string
}


const initialState = {
   messageMassive: [
   ] as Array<Message>,
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
   ] as any,
};

type initialStateType = typeof initialState

const messagesReducer = (state = initialState, action: MessagesActionType):initialStateType => {
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
