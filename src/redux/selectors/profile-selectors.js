export const getProfile = (state) => {
   return state.profilePage.profile;
};

export const getProfileStatus = (state) => {
   return state.profilePage.status;
};

export const getProfileId = (state) => {
   return state.auth.id;
};

export const getProfileLoading = (state) => {
   return state.profilePage.profileLoading;
};
