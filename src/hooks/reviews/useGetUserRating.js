// In your hooks/actors/useGetActors.js file

import { useQuery } from "@tanstack/react-query";
import { fetchMovieData } from "../../services/movies";
import { useAuthQuery } from "../common/useAuthQuery";
import { fetchUserRatingForMovie } from "../../services/reviews";

export function useGetUserRating(movieId) {
  const queryResult = useAuthQuery(
    ["userRating", movieId],
    fetchUserRatingForMovie,
    {},
    movieId
  );

  return {
    ...queryResult,
  };
}
