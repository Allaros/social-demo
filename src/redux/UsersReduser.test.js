import usersReduser, { toggleFollow } from './UsersReducer';

const inintialState = {
   users: [
      {
         followed: false,
         id: 32463,
         name: 'user',
      },
   ],
};

test('User following must be toggled', () => {
   let action = toggleFollow(32463, true);
   let newState = usersReduser(inintialState, action);
   expect(newState.users[0].followed).toBe(!inintialState.users[0].followed);
});

test('User following should not be toggled', () => {
   let action = toggleFollow(32463, false);
   let newState = usersReduser(inintialState, action);
   expect(newState.users[0].followed).toBe(inintialState.users[0].followed);
});
