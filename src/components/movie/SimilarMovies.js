import React from "react";
import { useGetSimilarMovies } from "../../hooks/movies/useGetSimilarMovies";
import { Puff } from "react-loader-spinner";
import MovieCard from "./MovieCard";
import { BASE_URL } from "../../utils/data";

function SimilarMovies({ movieId }) {
  const { data: similarMovies, isLoading: isLoadingSimilarMovies } =
    useGetSimilarMovies(movieId);
  console.log("similarMovies", movieId);
  if (isLoadingSimilarMovies) {
    return (
      <div className="my-10 w-full flex justify-center">
        <Puff
          visible={true}
          height="30"
          width="30"
          color="#FFD700"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  return (
    <div className="my-3 w-full  flex justify-start  items-center">
      {similarMovies.map((movie, index) => (
        <div className="w-64 mr-3" key={movie.id}>
          <MovieCard
            id={movie.id}
            className="h-[150px] w-[200px]"
            title={movie.title}
            thumbnail={`${BASE_URL}/${movie.poster}`}
            rating={movie.rating}
            info={movie.info}
          />
        </div>
      ))}
    </div>
  );
}

export default SimilarMovies;
