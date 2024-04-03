// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByGenre } from "../../services/movies";

export function useGetMoviesByGenra(genreId, pageSize = 10, currentPage = 1) {
  const queryResult = useQuery({
    queryKey: ["movies", genreId, currentPage, pageSize],
    queryFn: ({ signal }) =>
      fetchMoviesByGenre(signal, genreId, currentPage, pageSize),
    keepPreviousData: true, // Optional: Keep previous data while fetching the next page's data
  });

  return {
    ...queryResult,
  };
}
