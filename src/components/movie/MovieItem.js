import { faCopy, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Modal from "../UI/Modal";
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
function MovieItem({ movie }) {
  // Join genre values into a comma-separated string
  const genreDisplay = movie.genre.map((genre) => genre.value).join(", ");

  return (
    <li
      className="rounded overflow-hidden flex items-center justify-between
                   bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center">
        <img
          src={`${BASE_URL}/` + movie.poster}
          alt={movie.title}
          className="w-24 h-24 object-cover mr-4"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {movie.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{genreDisplay}</p>
        </div>
      </div>
      <div className="flex pr-4 items-center">
        <FontAwesomeIcon
          icon={faCopy}
          className="text-gray-600 dark:text-gray-400 mr-2 cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faEdit}
          className="text-gray-600 dark:text-gray-400 mr-2 cursor-pointer"
        />
        <Modal.Open opens={"confirm-delete"} data={{ movieId: movie.id }}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="text-gray-600 dark:text-gray-400 cursor-pointer"
          />
        </Modal.Open>
      </div>
    </li>
  );
}

export default MovieItem;
