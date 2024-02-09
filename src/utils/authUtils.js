import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Checking if token is expired
  } catch (error) {
    return false; // Invalid token format
  }
};
