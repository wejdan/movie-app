// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../../services/movies";

export function useGetAllGeneras() {
  const queryResult = useQuery({
    queryKey: ["genres"],
    queryFn: ({ signal }) => fetchGenres(signal),
    keepPreviousData: true, // Optional: Keep previous data while fetching the next page's data
  });

  return {
    ...queryResult,
  };
}
