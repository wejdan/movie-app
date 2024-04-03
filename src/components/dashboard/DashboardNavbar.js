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
import { useDispatch, useSelector } from "react-redux";
import { FaTachometerAlt, FaMoon, FaSun } from "react-icons/fa";
import { setMode } from "../../store/appSettingsSlice";

const Navbar = () => {
  const addActorMutate = useAddActor();
  const createMovieMutate = useCreateMovie();
  const isDarkMode = useSelector((state) => state.appSettings.isDarkMode);
  const dispatch = useDispatch();
  const toggleTheme = () => {
    dispatch(setMode(!isDarkMode));
    // Here, you would also update the global theme state or apply the theme change logic
  };
  return (
    <>
      <nav className="bg-gray-100 dark:bg-gray-900 dark:text-white max-w-5xl p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Input placeholder="search ..." />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="hover:text-gray-600 dark:hover:text-gray-300"
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
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
