import { faCopy, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import MovieItem from "../../components/movie/MovieItem";
import Button from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { useGetMovies } from "../../hooks/movies/useGetMovies";
import Modal from "../../components/UI/Modal";
import { useDeleteMovie } from "../../hooks/movies/useDeleteMovie";

const movies = [
  {
    title: "Pushpa: The Rise",
    genre: "Thriller Action",
    imageUrl:
      "https://th.bing.com/th/id/OIP.AUjDWxAES_aiqikLZkJUXQHaE8?rs=1&pid=ImgDetMain", // Replace with actual image path
  },
  {
    title: "Pachinko",
    genre: "Drama",
    imageUrl:
      "https://th.bing.com/th?id=OSK.HERO5wdB8pmThUYZst7tiQvMC1AfBqsppZTimnMH3yISGVw&w=472&h=280&c=1&rs=2&o=6&dpr=1.1&pid=SANGAM", // Replace with actual image path
  },
  {
    title: "Radhe Shyam",
    genre: "Romance Thriller",
    imageUrl:
      "https://www.easterneye.biz/wp-content/uploads/2021/04/Radhe-Shyam-new-poster.jpg", // Replace with actual image path
  },
  {
    title: "Marakkar: Lion of the Arabian Sea",
    genre: "Action History Drama",
    imageUrl:
      "https://th.bing.com/th?id=OSK.a8ad9bca3c273d1558773aaffb4c58d9&w=80&h=106&c=7&o=6&dpr=1.1&pid=SANGAM", // Replace with actual image path
  },
  {
    title: "Resident Evil: Welcome to Raccoon City",
    genre: "Horror",
    imageUrl:
      "https://www.bing.com/th?id=OSK.d58d7b75e9205952ce025f3a4ce17cbd&pid=cdx&w=86&h=128&c=7", // Replace with actual image path
  },
  {
    title: "Tadap",
    genre: "Thriller Drama",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c7/Tadap_film_poster.jpg", // Replace with actual image path
  },
  {
    title: "Dune",
    genre: "Sci-fi",
    imageUrl:
      "https://www.bing.com/th?id=OSK.8cdd8ff30b285ad7ff0000cb5d0e9234&pid=cdx&w=85&h=128&c=7", // Replace with actual image path
  },
  {
    title: "Mismatched",
    genre: "Comedy Drama",
    imageUrl:
      "https://www.bing.com/th?id=OSK.695e3dd1830304bfaecbd4257808088c&pid=cdx&w=85&h=128&c=7", // Replace with actual image path
  },
  {
    title: "Snowpiercer",
    genre: "Drama Fiction Thriller",
    imageUrl:
      "https://www.bing.com/th?id=OSK.e13db23f8547ca3f10f2e0774dd24fd1&pid=cdx&w=96&h=128&c=7", // Replace with actual image path
  },
  {
    title: "Hawkeye",
    genre: "Crime",
    imageUrl:
      "https://www.bing.com/th?id=OSK.e13db23f8547ca3f10f2e0774dd24fd1&pid=cdx&w=96&h=128&c=7", // Replace with actual image path
  },
];
const ConfirmDeleteContent = ({
  handleDirectClose,
  modalData,
  deleteMovieMutate,
}) => {
  return (
    <div className="">
      <h2 className="dark:text-white text-black text-lg font-semibold mb-4">
        Delete Confirmation
      </h2>
      <p className="text-gray-400 mb-6">
        Are you sure you want to delete this movie?
      </p>
      <div className="flex justify-end space-x-4">
        <Button
          isLoading={deleteMovieMutate.isPending}
          variant={"soild"}
          onClick={() => {
            // Perform the delete operation here
            deleteMovieMutate.mutate(modalData.movieId);
          }}
        >
          Confirm
        </Button>
        <Button variant={"link"} onClick={handleDirectClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: moviesData, isLoading } = useGetMovies(
    searchQuery,
    currentPage
  );
  const deleteMovieMutate = useDeleteMovie();

  const totalPages = moviesData?.totalPages || 0;
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page with new search results
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Assuming your API returns an object with actors and maybe total pages, etc.
  const movies = moviesData?.movies || [];

  return (
    <>
      <div className="flex flex-col h-full">
        <Input
          className="self-end m-4"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-4">
              {movies.map((movie, index) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </div>
        <div className="self-end mt-auto flex">
          <Button
            variant={"link"}
            onClick={handlePrevPage}
            isDisabled={currentPage <= 1}
          >
            Prev
          </Button>
          <Button
            variant={"link"}
            onClick={handleNextPage}
            isDisabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <Modal.Window
        name={"confirm-delete"}
        isPending={deleteMovieMutate.isPending}
        isSmall={true}
      >
        <ConfirmDeleteContent deleteMovieMutate={deleteMovieMutate} />
      </Modal.Window>
    </>
  );
};

export default Movies;
