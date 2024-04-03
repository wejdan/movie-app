// In your hooks/movies/useGetSimilarMovies.js

import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedMovies } from "../../services/movies";

export function useGetFeaturedMovies() {
  return useQuery({
    queryKey: ["featuredMovies"],
    queryFn: ({ signal }) => fetchFeaturedMovies(signal),
  });
}
