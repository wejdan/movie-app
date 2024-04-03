import { customFetch } from "../utils/utils";

const BASE_URL = `${process.env.REACT_APP_API_URL}/stats`;

export const fetchHighestRatedMovies = (token) => {
  return customFetch(`${BASE_URL}/highestRated`, { token });
};

export const fetchTotalUsers = (token) => {
  return customFetch(`${BASE_URL}/totalUsers`, { token });
};

export const fetchTotalReviews = (token) => {
  return customFetch(`${BASE_URL}/totalReviews`, { token });
};

export const fetchTotalMovies = (token) => {
  return customFetch(`${BASE_URL}/totalMovies`, { token });
};

export const fetchRecentUploads = (token) => {
  return customFetch(`${BASE_URL}/recentUpload`, { token });
};
