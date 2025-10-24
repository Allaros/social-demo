import profileReducer, { addPost, deletePost } from "./ProfileReducer";

   const state = {
      postInfo: [
         {
            id: "1",
            postText: "",
         },
      ],
   };

test("Length of postInfo should be incremented", () => {
   let action = addPost("new post");
   let newState = profileReducer(state, action);
   expect(newState.postInfo.length).toBe(state.postInfo.length + 1);
});

test("Last post shoud be correct", () => {
   let action = addPost("new post");
   let newState = profileReducer(state, action);
   expect(newState.postInfo[newState.postInfo.length - 1].postText).toBe("new post");
});

test("Post length shoud be decrement after deleting", () => {
   let action = deletePost(0);
   let newState = profileReducer(state, action);
   expect(newState.postInfo.length).toBe(state.postInfo.length - 1);
});

test("Post length shoud be not changed after deleting with wrong id", () => {
   let action = deletePost(10);
   let newState = profileReducer(state, action);
   expect(newState.postInfo.length).toBe(state.postInfo.length);
});
