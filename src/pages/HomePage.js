import React from "react";
import Modal, { useModalWindow } from "../components/UI/Modal";

import MoviesList from "../components/movie/MoviesList";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import FormInput from "../components/UI/FormInput";
import { useGetAllGeneras } from "../hooks/movies/useGetAllGeneras";
import Navbar from "../components/UI/Navbar";
import "swiper/less";
import "swiper/less/navigation";
import "swiper/less/pagination";
import FeaturedMovies from "../components/movie/FeaturedMovies";

function HomePage() {
  const { data } = useGetAllGeneras();
  const genreList = data ? data : [];
  return (
    <>
      <div className=" min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white ">
        <Navbar />

        <div className="  ">
          <div className="flex flex-col min-h-screen ">
            <FeaturedMovies />
            <main className=" flex-grow">
              {genreList.map((genre) => (
                <MoviesList genre={genre} />
              ))}
            </main>
          </div>
        </div>
      </div>

      {/* Add more components as needed */}
      {/* <Container>
        <Modal.Open opens={"window1"}>
          <Button className={"text-sm"} variant="solid">
            Sign up
          </Button>
        </Modal.Open>
        <Button className={"text-sm"} variant="outline">
          Create
        </Button>
        <Button className={"text-sm"} variant="link">
          Login
        </Button>
        <FormInput label="Email" type="email" placeholder="example@gmail.com" />
        <FormInput label="Password" type="password" placeholder="********" />
      </Container> */}
    </>
  );
}

export default HomePage;
