import { axiosInstance } from "./axiosInstance";

export const signUpAPI = async (signUpData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", signUpData);
    return response.data;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error.response?.data || { message: "Sign up failed" };
  }
};

export const loginAPI = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};
export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error.response?.data || { message: "Logout failed" };
  }
};

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data;
  } catch (error) {
    console.error("Error completing onboarding:", error);
    throw error.response?.data || { message: "Onboarding completion failed" };
  }
};

export const getFriends = async () => {
  try {
    const response = await axiosInstance.get("/user/friends");
    return response.data;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error.response?.data || { message: "Fetching friends failed" };
  }
};

export const getRecommendedUsers = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended users:", error);
    throw (
      error.response?.data || { message: "Fetching recommended users failed" }
    );
  }
};

export const getOutgoingFriendRequests = async () => {
  try {
    const response = await axiosInstance.get("/user/outgoing-friend-requests");
    return response.data;
  } catch (error) {
    console.error("Error fetching outgoing friend requests:", error);
    throw (
      error.response?.data || { message: "Fetching outgoing requests failed" }
    );
  }
};

export const sendFriendRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(`/user/friend-request/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error.response?.data || { message: "Sending friend request failed" };
  }
};

export const getFriendRequests = async () => {
  try {
    const response = await axiosInstance.get("/user/friend-requests");
    return response.data;
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    throw (
      error.response?.data || { message: "Fetching friend requests failed" }
    );
  }
};

export const acceptFriendRequest = async (requestId) => {
  try {
    const response = await axiosInstance.put(
      `/user/friend-request/${requestId}/accept`
    );
    return response.data;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw (
      error.response?.data || { message: "Accepting friend request failed" }
    );
  }
};

export const getStreamToken = async () => {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
};
