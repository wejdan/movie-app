// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { fetchMovieAverageRating } from "../../services/reviews";

export function useGetMovieRating(movieId) {
  const queryResult = useQuery({
    queryKey: ["rating", movieId],
    queryFn: ({ signal }) => fetchMovieAverageRating(signal, movieId),
    keepPreviousData: true, // Optional: Keep previous data while fetching the next page's data
  });

  return {
    ...queryResult,
  };
}
