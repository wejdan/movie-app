import { customFetch } from "../utils/utils";

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const signUp = (email, password, name) => {
  return customFetch(`${API_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = (email, password) => {
  return customFetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const getUserData = (token) => {
  return customFetch(`${API_URL}/userData`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestOtp = (email) => {
  return customFetch(`${API_URL}/requestOtp`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const verifyOtp = (email, otp) => {
  return customFetch(`${API_URL}/verifyOtp`, {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
};

export const resetPassword = (token, newPassword) => {
  return customFetch(`${API_URL}/reset/${token}`, {
    method: "POST",
    body: JSON.stringify({ password: newPassword }),
  });
};

export const requestPasswordReset = (email) => {
  return customFetch(`${API_URL}/forgot`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};
export const updateUserPassword = (token, currentPassword, newPassword) => {
  return customFetch(`${API_URL}/updatePassword`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
};
