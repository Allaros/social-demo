import axios from 'axios';

const API_KEY = '09a841d9-9bc3-4033-86f2-da06c8eea464';

const instanse = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': API_KEY,
   },
});

//=======================================Auth request======================================================

export const getUserData = () => {
   return instanse.get(`auth/me`).then((response) => response.data);
};

export const autorizeUser = ({ email, password, rememberMe, captcha }) => {
   return instanse.post(`auth/login`, { email, password, rememberMe, captcha }).then((response) => response.data);
};

export const logoutUser = () => {
   return instanse.delete(`auth/login`).then((response) => response.data);
};

export const getCaptcha = () => {
   return instanse.get(`security/get-captcha-url`).then((response) => response.data);
};

//=======================================Users requests======================================================

export const getUsers = (page, pageSize) => {
   return instanse.get(`users?page=${page}&count=${pageSize}`).then((response) => response.data);
};

export const followUserRequest = (id) => {
   return instanse.post(`follow/${id}`).then((response) => response.data);
};

export const unfollowUserRequest = (id) => {
   return instanse.delete(`follow/${id}`).then((response) => response.data);
};

//=======================================Profile requests======================================================

export const loadProfile = (userId) => {
   return instanse.get(`profile/${userId}`).then((response) => response.data);
};

export const getUserStatus = (userId) => {
   return instanse.get(`profile/status/${userId}`).then((response) => response.data);
};

export const updateStatus = (status) => {
   return instanse.put(`profile/status`, { status }).then((response) => response.data);
};

export const updateAvatar = (image) => {
   const formData = new FormData();
   formData.append('image', image);
   return instanse
      .put(`profile/photo`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
      .then((response) => response.data);
};

export const updateUserInfo = (data) => {
   return instanse.put(`profile`, { ...data }).then((response) => response.data);
};

//===================================Messages===============================================

export const setDialog = async (userId: number) => {
   const response = await instanse.put(`dialogs/${userId}`);
   return response.data;
};

export const getAllDialogs = async () => {
   const response = await instanse.get(`dialogs`);
   return response.data;
};

export const getListOfMessages = async (userId: number, page: number, count: number) => {
   const response = await instanse.get(`dialogs/${userId}/messages?page=${page}&count=${count}`);
   return response.data;
};

export const sendMessage = async (userId: number, body: string) => {
   const response = await instanse.post(`dialogs/${userId}/messages`, {body});
   return response.data;
};



