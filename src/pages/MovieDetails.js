import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Button from "../components/UI/Button";
import Modal, { useModalWindow } from "../components/UI/Modal";
import Input from "../components/UI/Input";
import Rating from "../components/movie/Rating";
import { useSelector } from "react-redux";
import { useGetMovieDetails } from "../hooks/movies/useGetMovieDetails";
import Loader from "../components/UI/Loader";
import { useGetUserRating } from "../hooks/reviews/useGetUserRating";
import { useCreateReview } from "../hooks/reviews/useCreateReview";
import { useUpdateReview } from "../hooks/reviews/useUpdateRating";
import { useGetSimilarMovies } from "../hooks/movies/useGetSimilarMovies";
import SimilarMovies from "../components/movie/SimilarMovies";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

const MovieDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { movieId } = useParams(); // Access the movie ID from URL parameters
  const {
    data: movie,
    isLoading,
    error: errorLoadingMovie,
    isError,
  } = useGetMovieDetails(movieId); // Assuming useGetMovieDetails hook takes a movieId parameter
  const createReviewMutate = useCreateReview();
  const updateReviewMutate = useUpdateReview(); // Assuming you have a mutation hook for updating reviews
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState(null);
  const { closeModal } = useModalWindow(); // Destructure closeModal from the useModalWindow hook
  const {
    data: userRating,
    isLoading: loadingUserRating,
    error,
  } = useGetUserRating(movieId);

  const handleSubmitReview = () => {
    const reviewData = { movieId, rating, comment };
    if (reviewId) {
      // If there's an existing rating, call update mutation
      updateReviewMutate.mutate({ ...reviewData, reviewId }); // Assuming each rating has a unique _id
    } else {
      // If there's no existing rating, call create mutation
      console.log(reviewData, "***");
      createReviewMutate.mutate(reviewData);
    }
  };
  useEffect(() => {
    // Find the user's rating for this movie
    console.log("userRating", userRating);
    if (userRating) {
      setRating(userRating.rating);
      setComment(userRating.comment || "");
      setReviewId(userRating.id); // Store the entire rating object
    }
  }, [userRating, movieId]);
  if (isLoading || loadingUserRating) {
    return <Loader />;
  }
  if (isError) {
    const errorMessage =
      errorLoadingMovie.message || "An unknown error occurred";
    return (
      <div className="container mx-auto w-full  flex-grow flex items-center justify-center ">
        <p>An error occurred: {errorMessage}</p>
      </div>
    );
  }
  if (!movie) {
    return <div className="container mx-auto px-4 ">Movie not found</div>;
  }
  return (
    <>
      <div className=" ">
        {/* Container for the movie details */}
        <div className="container mx-auto px-4 ">
          {/* Movie Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="mt-2">{movie.description}</p>
          </div>

          {/* Movie Information */}
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/5">
              {/* Placeholder for the video or image thumbnail */}
              <div className="bg-gray-800 aspect-video mb-4 md:mr-4">
                <video
                  controls
                  className="w-full h-full object-cover" // Ensure the video covers the div
                  poster={`${BASE_URL}/` + movie.poster}
                >
                  <source
                    src={`${BASE_URL}/` + movie.trailer}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="w-full md:w-2/5">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Details</h2>
                <p>Director: {movie.director?.name || ""}</p>
                <div>
                  Writers:{" "}
                  {movie.writers.map((writer) => writer.name).join(", ")}
                </div>{" "}
                {/* Assuming writers is an array of objects */}{" "}
                <p>Language: {movie.language}</p>
                <p>Release Date: {movie.releaseDate}</p>
                <div>
                  Genres: {movie.genre.map((genre) => genre.value).join(", ")}
                </div>{" "}
                {/* Assuming genre is an array of objects */}{" "}
              </div>
              {/* Movie Rating */}
              <div className="mb-4">
                <h2 className="text-xl font-bold">Rating</h2>
                <p>{movie.averageRating}</p>
              </div>
              {/* Action Buttons */}
              <div className="flex">
                <Modal.Open opens={"rate"}>
                  <Button variant={"outline"}>Rate The Movie</Button>
                </Modal.Open>
                {/* Replace the button with NavLink */}
                <NavLink
                  to={`/movie/review/${movie.id}`} // Replace movie.id with the actual ID property
                  className="text-gold hover:text-darkgold  dark:text-yellow-400 dark:hover:text-yellow-500 px-4 py-2 rounded transition duration-300"
                >
                  Read Reviews
                </NavLink>
              </div>
            </div>
          </div>

          {/* Movie Cast - assuming there's an array of cast members */}
          <div className="my-16">
            <h2 className="text-xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movie.casts.map((cast) => (
                <div key={cast.id} className="text-center">
                  {/* Assuming profile contains the URL to the actor's image */}
                  <img
                    src={`${BASE_URL}/` + cast.actor.profile}
                    alt={cast.actor.name}
                    className="w-24 h-24 bg-gray-800 rounded-full mx-auto object-cover" // Added object-cover for better image fit
                  />
                  <p className="mt-2 font-bold">{cast.actor.name}</p>
                  <p className="text-sm text-gray-400">{cast.role}</p>
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-xl font-bold  mt-20">Similar Movies</h2>

          <SimilarMovies movieId={movieId} />
        </div>
      </div>
      <Modal.Window
        isPending={createReviewMutate.isPending || updateReviewMutate.isPending}
        name={"rate"}
        isSmall={true}
      >
        <div className="flex flex-col justify-center items-center space-y-4">
          {user ? (
            <>
              <Rating rating={rating} setRating={setRating} />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 w-full leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
              />
              <Button
                className={"self-stretch"}
                variant={"solid"}
                onClick={handleSubmitReview}
                isLoading={
                  createReviewMutate.isPending || updateReviewMutate.isPending
                }
                isDisabled={
                  rating === 0 ||
                  comment.trim() === "" ||
                  (comment.trim() === userRating?.comment &&
                    rating === userRating?.rating)
                }
              >
                {reviewId ? "Update Your Rating" : "Rate This Movie"}
              </Button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-xl font-semibold text-yellow-400 mb-4">
                Want to Rate This Movie?
              </p>
              <p className="text-gray-300 mb-6">
                Sign in now to share your thoughts and rate the movie.
              </p>
              <Button
                onClick={() => {
                  closeModal("rate");
                  navigate("/login");
                }}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                variant="solid"
              >
                Login to Rate
              </Button>
            </div>
          )}
        </div>
      </Modal.Window>
    </>
  );
};

export default MovieDetails;
