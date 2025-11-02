type Friend = {
   avatar: string
   id: number
   name: string
}

type initialStateType = {
   friends: Array<Friend>
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
