import { customFetch, handleResponseError } from "../utils/utils";

const URL = `${process.env.REACT_APP_API_URL}/movies`;
export const fetchGenres = (signal) => {
  return customFetch(`${URL}/generas`, { signal });
};
export async function createMovie(token, movieData) {
  const formData = new FormData();
  formData.append("title", movieData.title);
  formData.append("description", movieData.description);
  formData.append("language", movieData.language);
  formData.append("type", movieData.type);
  formData.append("status", movieData.status);
  formData.append("releaseDate", movieData.releaseDate);
  if (movieData.director) {
    formData.append("director", movieData.director);
  }

  // Ensure 'writers' is always an array
  const genreArray = Array.isArray(movieData.genre)
    ? movieData.genre
    : [movieData.genre];
  formData.append("genre", JSON.stringify(genreArray));

  const writersArray = Array.isArray(movieData.writers)
    ? movieData.writers
    : [movieData.writers];
  formData.append("writers", JSON.stringify(writersArray));

  // Ensure 'casts' is always an array
  const castsArray = Array.isArray(movieData.casts)
    ? movieData.casts
    : [movieData.casts];
  formData.append("casts", JSON.stringify(castsArray));

  // Ensure 'tags' is always an array
  const tagsArray = Array.isArray(movieData.tags)
    ? movieData.tags
    : [movieData.tags];
  formData.append("tags", JSON.stringify(tagsArray));

  // Append files if available
  formData.append("poster", movieData.poster);
  formData.append("trailer", movieData.trailer);
  return customFetch(`${URL}`, {
    method: "POST",
    body: formData,
    token, // Pass the token directly; customFetch will handle Authorization header
  });
}
export const getAllMovies = async (signal, searchQuery = "", page = 1) => {
  const params = new URLSearchParams({
    query: searchQuery,
    page,
  });
  return customFetch(`${URL}?${params.toString()}`, { signal });
};
export const deleteMovie = async (token, movieId) => {
  return customFetch(`${URL}/${movieId}`, {
    method: "DELETE",
    token,
  });
};

export const fetchMoviesByGenre = async (
  signal,
  genreId,
  page = 1,
  pageSize = 10
) => {
  const params = new URLSearchParams({ page, pageSize });
  return customFetch(`${URL}/genre/${genreId}?${params.toString()}`, {
    signal,
  });
};

export const fetchMovieData = async (signal, movieId) => {
  return customFetch(`${URL}/${movieId}`, { signal });
};

export const fetchMovieReviews = async (movieId) => {
  return customFetch(`${URL}/${movieId}/reviews`, {});
};

export const fetchSimilarMovies = async (signal, movieId) => {
  return customFetch(`${URL}/similar-movies/${movieId}`, { signal });
};

export const fetchFeaturedMovies = async (signal) => {
  return customFetch(`${URL}/featured-movies`, { signal });
};
