import { customFetch } from "../utils/utils";

const URL = `${process.env.REACT_APP_API_URL}/movies`;

export const createReview = (token, reviewData) => {
  const { movieId } = reviewData;
  return customFetch(`${URL}/${movieId}/reviews/`, {
    method: "POST",
    body: JSON.stringify(reviewData),
    token, // customFetch will handle the Authorization header
  });
};

export const fetchMovieAverageRating = (signal, movieId) => {
  return customFetch(`${URL}/${movieId}/averageRating}`, { signal });
};

export const fetchUserRatingForMovie = (token, movieId) => {
  if (!token) return Promise.resolve(null); // Return null if no token is provided
  // Update the URL to point to the nested route for reviews specific to a movie
  console.log("fetchUserRatingForMovie", token, movieId);
  return customFetch(`${URL}/${movieId}/reviews/userRating`, { token });
};

export const updateReview = (token, reviewData) => {
  const { reviewId, movieId } = reviewData; // Extract reviewId from reviewData
  return customFetch(`${URL}/${movieId}/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(reviewData),
    token, // customFetch will handle the Authorization header
  });
};
