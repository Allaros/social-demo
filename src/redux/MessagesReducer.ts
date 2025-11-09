import { ThunkAction } from "redux-thunk";
import { checkNewMessages, getAllDialogs, getListOfMessages, sendMessage, setDialog } from "../api/api.ts";
import { Photos } from "./ProfileReducer.ts";
import { RootState } from "./reduxStore.ts";

//Actions

const SET_DIALOGS = 'MessagesReducer/SET_DIALOGS' as const;

const LOAD_MESSAGES = 'MessagesReducer/LOAD_MESSAGES' as const;

const SET_NEW_MESSGES_COUNT = 'MessagesReducer/SET_NEW_MESSGES_COUNT' as const;



type setDialogsType = {
   type: typeof SET_DIALOGS
   dialogs: Array<Person>
}

type loadMessagesType = {
   type: typeof LOAD_MESSAGES
   messagesList: Array<MessageType>
}

type setNewMessagesCountType = {
   type: typeof SET_NEW_MESSGES_COUNT
   messagesCount: number
}

export const setDialogs = (dialogs: Array<Person>): setDialogsType => ({type: SET_DIALOGS, dialogs})

export const loadMessages = (messagesList: Array<MessageType>): loadMessagesType => ({type: LOAD_MESSAGES, messagesList})

export const setNewMessagesCount = (messagesCount: number): setNewMessagesCountType => ({type: SET_NEW_MESSGES_COUNT, messagesCount})


type MessagesActionType =  setDialogsType | loadMessagesType | setNewMessagesCountType;


//Thunks

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, MessagesActionType>;

export const getDialogs = (): ThunkType => {
   
   return async (dispatch) => {
      const response = await getAllDialogs();
      let dialogs: Array<Person> = []
      response.forEach((person: DialogType) => {
         let dialog = {
            id: person.id,
            name: person.userName,
            avatar: person.photos.small
         }
         dialogs.push(dialog)
      })
      dispatch(setDialogs(dialogs))
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
   translatedBody?: unknown
   viewed: boolean
}
export const loadDialog = (userId: number): ThunkType => {
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

export const sendNewMessage = (userId: number, messageBody: string): ThunkType => {
   return async (dispatch) => {
      await sendMessage(userId, messageBody);
      dispatch(loadDialog(userId));
   }
}

export const getNewMessages = (): ThunkType => {
   return async (dispatch) => {
      let response = await checkNewMessages();
      dispatch(setNewMessagesCount(response))
      
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


export const startDialog = (userId: number): ThunkType => {
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
   newMessagesCount: 0 as number
};

type initialStateType = typeof initialState

const messagesReducer = (state = initialState, action: MessagesActionType):initialStateType => {
   switch (action.type) {
      case LOAD_MESSAGES:
         return {
            ...state, messageMassive: [...action.messagesList]}
      case SET_DIALOGS:
         return {
            ...state,
            dialogs: [...action.dialogs]
         }
      case SET_NEW_MESSGES_COUNT:
         return{
            ...state, newMessagesCount: action.messagesCount
         }
      default:
         return state;
   }
};

export default messagesReducer;
