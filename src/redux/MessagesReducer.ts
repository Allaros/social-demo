import { getAllDialogs, getListOfMessages, sendMessage, setDialog } from "../api/api.ts";
import { Photos } from "./ProfileReducer.ts";

//Actions

const SET_DIALOGS = 'MessagesReducer/SET_DIALOGS' as const;

const LOAD_MESSAGES = 'MessagesReducer/LOAD_MESSAGES' as const;


type setDialogsType = {
   type: typeof SET_DIALOGS
   id: number, 
   name: string
   avatar: string | null
}

type loadMessagesType = {
   type: typeof LOAD_MESSAGES
   messagesList: Array<MessageType>
}


export const setDialogs = (id: number, name: string, avatar: string | null): setDialogsType => ({type: SET_DIALOGS, id, name, avatar})

export const loadMessages = (messagesList: Array<MessageType>): loadMessagesType => ({type: LOAD_MESSAGES, messagesList})


type MessagesActionType =  setDialogsType | loadMessagesType;


//Thunks
export const getDialogs = () => {
   
   return async (dispatch) => {
      const response = await getAllDialogs();
      response.forEach((person: DialogType) => {
         dispatch(setDialogs(person.id, person.userName, person.photos.small))
      })
      debugger
   }
}

type listOfMessagesResponse = {
   error: null | Array<string>
   items: Array<MessageType>
   totalCount: number
}

type MessageType = {
   addedAt: string
   body: string
   id: string
   recipientId: number
   senderId: number
   senderName: string
   translatedBody?: any
   viewed: boolean
}
export const chooseDialog = (userId: number) => {
   return async (dispatch) => {
      const response: listOfMessagesResponse = await getListOfMessages(userId, 1, 10);
      let messagesList: Array<MessageType> = []
      response.items.forEach((message) => {
         const date = new Date(message.addedAt);
         let formattedTime = date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit', 
            hour12: false 
         })
         messagesList.push({...message, addedAt: formattedTime});
      })
      dispatch(loadMessages(messagesList))
   }
}

export const sendNewMessage = (userId: number, messageBody: string) => {
   return async (dispatch) => {
      await sendMessage(userId, messageBody);
   }
}

type DialogType = {
   hasNewMessages: boolean
   id: number
   lastDialogActivityDate: string
   lastUserActivityDate: string
   newMessagesCount: number
   photos: Photos
   userName: string
}


export const startDialog = (userId: number) => {
   return async (dispatch) => {
      await setDialog(userId);
   }
}

//Reducer

type Person = {
   id: number
   name: string,
   avatar: string | null
}

const initialState = {
   messageMassive: [
   ] as Array<MessageType>,
   dialogs: [
   ] as Array<Person>,
};

type initialStateType = typeof initialState

const messagesReducer = (state = initialState, action: MessagesActionType):initialStateType => {
   switch (action.type) {
      case LOAD_MESSAGES:
         return {
            ...state, messageMassive: [...state.messageMassive, ...action.messagesList]}
      case SET_DIALOGS:
         let dialog: Person = {
               id: action.id,
               name: action.name,
               avatar: action.avatar
            }
         return {
            ...state,
            dialogs: [...state.dialogs, dialog]
         }
      default:
         return state;
   }
};

export default messagesReducer;
