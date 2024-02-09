// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "../../services/movies";

export function useGetMovies(searchQuery = "", currentPage = 1) {
  const queryResult = useQuery({
    queryKey: ["movies", searchQuery, currentPage],
    queryFn: ({ signal }) => getAllMovies(signal, searchQuery, currentPage),
    keepPreviousData: true, // Optional: Keep previous data while fetching the next page's data
  });

  return {
    ...queryResult,
  };
}
