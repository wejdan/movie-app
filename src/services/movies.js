const URL = `${process.env.REACT_APP_API_URL}/movies`;
export async function fetchGenres(signal) {
  try {
    const response = await fetch(`${URL}/generas`, { signal });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const genres = await response.json();
    console.log("genres", genres);
    return genres;
  } catch (error) {
    console.error("Could not fetch genres:", error);
  }
}
export async function createMovie(token, movieData) {
  console.log("token, movieData");
  const formData = new FormData();
  formData.append("title", movieData.title);
  formData.append("description", movieData.description);
  formData.append("language", movieData.language);
  formData.append("type", movieData.type);
  formData.append("status", movieData.status);
  formData.append("releaseDate", movieData.releaseDate);
  formData.append("director", movieData.director);

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
  console.log(formData);
  try {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    console.log(response);
    if (!response.ok) {
      console.log("Response is not ok, attempting to throw an error...");
      const errorData = await response.json(); // Ensure this line executes without issues
      console.log("Error Data:", errorData); // Log to see what the server responded with
      const error = new Error(errorData.message || "Failed to create movie");
      error.status = response.status; // Add the status code to the error object
      throw error;
    }

    const result = await response.json();
    console.log("Movie created successfully:", result);
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
}
export const getAllMovies = async (signal, searchQuery = "", page = 1) => {
  console.log(signal, searchQuery, page);
  const params = new URLSearchParams({
    query: searchQuery,
    page,
  });
  try {
    const response = await fetch(`${URL}?${params.toString()}`, { signal }); // Replace with your actual server URL
    if (!response.ok) {
      throw new Error("Failed to fetch movies: " + response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data; // Assuming the server response format is { users: [...] }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; // Re-throw the error for handling by the caller
  }
};
export const deleteMovie = async (token, movieId) => {
  try {
    const response = await fetch(`${URL}/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authorization
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message || "Failed to delete movie");
      error.status = response.status; // Add the status code to the error object
      throw error;
    }

    return await response.json(); // This should return a message confirming the deletion
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error; // Propagate the error to be handled where the function is called
  }
};

export const fetchMoviesByGenre = async (
  signal,
  genreId,
  page = 1,
  pageSize = 10
) => {
  try {
    // Construct the URL with query parameters for pagination and genre ID
    const params = new URLSearchParams({
      page,
      pageSize,
    });
    const response = await fetch(
      `${URL}/genre/${genreId}?${params.toString()}`,
      {
        method: "GET",
        signal, // Pass the AbortController signal for request cancellation if needed
        headers: {
          "Content-Type": "application/json",
          // Authorization header if required
          // "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movies = await response.json();
    console.log("Fetched movies by genre:", movies);
    return movies;
  } catch (error) {
    console.error("Could not fetch movies by genre:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};
