// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { fetchMovieAverageRating } from "../../services/reviews";
import { fetchMovieReviews } from "../../services/movies";

export function useGetMovieReviewsList(movieId) {
  const queryResult = useQuery({
    queryKey: ["reviews", movieId],
    queryFn: () => fetchMovieReviews(movieId),
    keepPreviousData: true, // Optional: Keep previous data while fetching the next page's data
  });

  return {
    ...queryResult,
  };
}
