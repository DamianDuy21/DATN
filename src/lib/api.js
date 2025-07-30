import { axiosInstance } from "./axiosInstance";
import Cookies from "js-cookie";

export const signUpAPI = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};
export const signUpVerificationAPI = async (otp) => {
  const response = await axiosInstance.post("/auth/signup/verify-otp", {
    otp,
  });
  return response.data;
};

export const loginAPI = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  const jwt = response.data?.data;

  Cookies.set("jwt", jwt, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
    path: "/",
  });
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post("/auth/logout");
  Cookies.remove("jwt", {
    secure: true,
    sameSite: "Strict",
    path: "/",
  });
  return response.data;
};

export const getAuthUserAPI = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const onboardingAPI = async (userData) => {
  const response = await axiosInstance.put("/auth/onboarding", userData);
  return response.data;
};

export const getFriendsAPI = async () => {
  const response = await axiosInstance.get("/user/friends");
  return response.data;
};

export const getRecommendedUsersAPI = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export const getOutgoingFriendRequestsAPI = async () => {
  const response = await axiosInstance.get("/user/outgoing-friend-requests");
  return response.data;
};

export const sendFriendRequestAPI = async (userId) => {
  const response = await axiosInstance.post(`/user/friend-request/${userId}`);
  return response.data;
};

export const getFriendRequestsAPI = async () => {
  const response = await axiosInstance.get("/user/friend-requests");
  return response.data;
};

export const acceptFriendRequestAPI = async (requestId) => {
  const response = await axiosInstance.put(
    `/user/friend-request/${requestId}/accept`
  );
  return response.data;
};

export const getStreamTokenAPI = async () => {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
};

export const resetPasswordAPI = async (email) => {
  const response = await axiosInstance.post("/auth/reset-password", {
    email,
  });
  return response.data;
};

export const resetPasswordVerificationAPI = async ({ newPassword, otp }) => {
  const response = await axiosInstance.post("/auth/reset-password/verify-otp", {
    newPassword,
    otp,
  });
  return response.data;
};

export const changePasswordAPI = async ({ oldPassword, newPassword }) => {
  const response = await axiosInstance.post("/auth/change-password", {
    oldPassword,
    newPassword,
  });
  return response.data;
};

export const changePasswordVerificationAPI = async (otp) => {
  const response = await axiosInstance.post(
    "/auth/change-password/verify-otp",
    {
      otp,
    }
  );
  return response.data;
};

export const getNativeLanguagesAPI = async () => {
  const response = await axiosInstance.get("/category/native-languages");
  return response.data;
};

export const getLearningLanguagesAPI = async () => {
  const response = await axiosInstance.get("/category/learning-languages");
  return response.data;
};
