// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { fetchHighestRatedMovies } from "../../services/reviews";

export function useGetHighestRatedMovies() {
  const queryResult = useQuery({
    queryKey: ["highestRatedMovies"],
    queryFn: ({ signal }) => fetchHighestRatedMovies(signal),
    keepPreviousData: true, // Optional: Keep previous data while fetching the next page's data
  });

  return {
    ...queryResult,
  };
}
