export type FriendType = {
   avatar: string
   id: number
   name: string
}

type initialStateType = {
   friends: Array<FriendType>
}

const initialState: initialStateType = {
   friends: [],
};

const sidebarReducer = (state = initialState, action: any) => {
   switch (action.type) {
      default:
         return state;
   }
};

export default sidebarReducer;
