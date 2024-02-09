import React, { useState, useEffect } from "react";
import { Input } from "../../components/UI/Input";
import Actor from "../../components/movie/Actor";
import Button from "../../components/UI/Button";
import { useGetAllActors } from "../../hooks/actors/useGetActors";
function Actors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: actorsData, isLoading } = useGetAllActors(
    searchQuery,
    currentPage
  );
  const totalPages = actorsData?.totalPages || 0;
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
  const actors = actorsData?.actors || [];

  return (
    <div className="flex flex-col h-full">
      <Input
        className="self-end m-4"
        placeholder="Search Actors..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid mt-5 grid-cols-4 gap-4 p-4">
            {actors.map((actor, index) => (
              <Actor actor={actor} key={index} />
            ))}
          </div>
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
  );
}

export default Actors;
