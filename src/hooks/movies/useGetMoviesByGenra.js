// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByGenre } from "../../services/movies";

export function useGetMoviesByGenra(
  genreId,
  searchQuery = "",
  currentPage = 1
) {
  const queryResult = useQuery({
    queryKey: ["movies", searchQuery, currentPage],
    queryFn: ({ signal }) =>
      fetchMoviesByGenre(signal, genreId, searchQuery, currentPage),
    keepPreviousData: true, // Optional: Keep previous data while fetching the next page's data
  });

  return {
    ...queryResult,
  };
}
