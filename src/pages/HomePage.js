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

function HomePage() {
  const { data } = useGetAllGeneras();

  const genreList = data ? data : [];
  console.log(genreList);
  return (
    <>
      <div className="bg-gray-900 min-h-screen  text-white">
        <Navbar />

        <div className="container ">
          <div className="flex flex-col min-h-screen ">
            <main className="pl-8 flex-grow">
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
