import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGetMoviesByGenra } from "../hooks/movies/useGetMoviesByGenra";
import Loader from "../components/UI/Loader";
import MovieCard from "../components/movie/MovieCard";
import { BASE_URL } from "../utils/data";

function MoviesCategory() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const { data, isLoading } = useGetMoviesByGenra(id, 50, currentPage);

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          data &&
          currentPage < data.totalPages
        ) {
          setCurrentPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, currentPage, data?.totalPages]
  );

  useEffect(() => {
    if (data?.movies && currentPage === 1) {
      setMovies(data.movies);
    } else if (data?.movies && data.movies.length > 0) {
      setMovies((prevMovies) => [...prevMovies, ...data.movies]);
    }
  }, [data?.movies, currentPage]);

  const renderMovies = (moviesList) => {
    return moviesList.map((movie, index) => (
      <div
        ref={moviesList.length === index + 1 ? lastMovieElementRef : null}
        className="w-64 mr-3"
        key={movie.id}
      >
        <MovieCard
          id={movie.id}
          className="h-[150px]"
          title={movie.title}
          thumbnail={`${BASE_URL}/${movie.poster}`}
          rating={movie.rating}
          info={movie.info}
        />
      </div>
    ));
  };

  return (
    <div>
      <h2 className="py-6 text-center text-white font-bold capitalize text-xl">
        Movies in {data?.category}
      </h2>
      <div className="flex flex-wrap justify-center md:justify-start ">
        {renderMovies(movies)}
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default MoviesCategory;
