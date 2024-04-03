// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { fetchMovieData } from "../../services/movies";

export function useGetMovieDetails(movieId) {
  const queryResult = useQuery({
    queryKey: ["movie", movieId],
    queryFn: ({ signal }) => fetchMovieData(signal, movieId),
    keepPreviousData: true, // Optional: Keep previous data while fetching the next page's data
  });

  return {
    ...queryResult,
  };
}
