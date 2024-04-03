// In your hooks/movies/useGetSimilarMovies.js

import { useQuery } from "@tanstack/react-query";
import { fetchSimilarMovies } from "../../services/movies";

export function useGetSimilarMovies(movieId) {
  return useQuery({
    queryKey: ["similarMovies", movieId],
    queryFn: ({ signal }) => fetchSimilarMovies(signal, movieId),
    enabled: !!movieId, // Only fetch if movieId is available
  });
}
