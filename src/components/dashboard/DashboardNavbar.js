import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa"; // Import icons from react-icons
import { Input } from "../UI/Input";
import Button from "../UI/Button";
import Menu from "../UI/Menu";
import Modal from "../UI/Modal";
import CreateMovieForm from "./CreateMovieForm";
import CreateActorForm from "./CreateActorForm";
import { useAddActor } from "../../hooks/actors/useAddActor";
import { useCreateMovie } from "../../hooks/movies/useCreateMovie";

const Navbar = () => {
  const addActorMutate = useAddActor();
  const createMovieMutate = useCreateMovie();

  return (
    <>
      <nav className="bg-gray-900 text-white max-w-5xl p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Input placeholder="search ..." />
        </div>

        <div className="flex items-center space-x-4">
          <Menu>
            <Menu.Open>
              <Button solid="outline">
                <span className="flex items-center">
                  Create
                  <FaPlus className="ml-2" />
                </span>
              </Button>
            </Menu.Open>
            <Menu.MenuItems>
              <Modal.Open opens={"add-movie"}>
                <Menu.Item>
                  <span>Movie</span>
                </Menu.Item>
              </Modal.Open>

              <Modal.Open opens={"add-actor"}>
                <Menu.Item>
                  <span>Actor</span>
                </Menu.Item>
              </Modal.Open>
            </Menu.MenuItems>
          </Menu>
        </div>
      </nav>
      <Modal.Window
        isPending={createMovieMutate.isPending}
        name={"add-movie"}
        isSmall={true}
      >
        <CreateMovieForm createMovieMutate={createMovieMutate} />
      </Modal.Window>
      <Modal.Window
        isPending={addActorMutate.isPending}
        name={"add-actor"}
        isSmall={true}
      >
        <CreateActorForm addActorMutate={addActorMutate} />
      </Modal.Window>
    </>
  );
};

export default Navbar;
