import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import Input from "../components/UI/Input";
import Rating from "../components/movie/Rating";
import { useSelector } from "react-redux";
// Import your video player component if you have one
// Import your components like CastList, ReviewButton, etc.
const movie = {
  id: 123,
  title: "Jai Bhim",
  description:
    "A pregnant woman from a primitive tribal community, searches desperately for her husband, who is missing from police custody. A High Court advocate rises in support to find her husband and seek justice for them.",
  director: "T.J. Gnanavel",
  writers: "T.J. Gnanavel",
  cast: ["Suriya", "Lijomol Jose"],
  language: "Tamil",
  releaseDate: "2021-09-01",
  genre: "Drama Thriller",
  type: "Film",
  // Add your video source here
  videoSrc: "path-to-your-video.mp4",
};

// You would need to pass the movie details as props or fetch them from an API in a real-world scenario.
const MovieDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Container for the movie details */}
        <div className="container mx-auto px-4 py-8">
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
                {/* Replace this with an <img> tag or video player */}
              </div>
            </div>

            <div className="w-full md:w-2/5">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Details</h2>
                <p>Director: {movie.director}</p>
                <p>Writers: {movie.writers}</p>
                <p>Cast: {movie.cast}</p>
                <p>Language: {movie.language}</p>
                <p>Release Date: {movie.releaseDate}</p>
                <p>Genre: {movie.genre}</p>
              </div>
              {/* Movie Rating */}
              <div className="mb-4">
                <h2 className="text-xl font-bold">Rating</h2>
                <p>{movie.rating}</p>
              </div>
              {/* Action Buttons */}
              <div className="flex">
                <Modal.Open opens={"rate"}>
                  <Button variant={"outline"}>Rate The Movie</Button>
                </Modal.Open>
                {/* Replace the button with NavLink */}
                <NavLink
                  to={`/movie/review/${movie.id}`} // Replace movie.id with the actual ID property
                  className="text-yellow-400 hover:text-yellow-500 px-4 py-2 rounded transition duration-300"
                >
                  Read Reviews
                </NavLink>
              </div>
            </div>
          </div>

          {/* Movie Cast - assuming there's an array of cast members */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movie.cast.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto"></div>
                  <p className="mt-2">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal.Window name={"rate"} isSmall={true}>
        <div className="flex  flex-col justify-center items-center space-y-4">
          {user ? (
            <>
              <Rating />
              <textarea className="bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 w-full leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500" />
              <Button className={"self-stretch"} variant={"solid"}>
                Rate This Movie
              </Button>
            </>
          ) : (
            <div className="  text-center">
              <p className="text-xl font-semibold text-yellow-400 mb-4">
                Want to Rate This Movie?
              </p>
              <p className="text-gray-300 mb-6">
                Sign in now to share your thoughts and rate the movie.
              </p>
              <Button
                onClick={() => {
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
