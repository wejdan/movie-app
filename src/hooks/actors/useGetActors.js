// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { getAllActors } from "../../services/actors";

export function useGetAllActors(searchQuery = "", currentPage = 1) {
  const queryResult = useQuery({
    queryKey: ["actors", searchQuery, currentPage],
    queryFn: ({ signal }) => getAllActors(signal, searchQuery, currentPage),
    keepPreviousData: true, // Optional: Keep previous data while fetching the next page's data
  });

  return {
    ...queryResult,
  };
}
