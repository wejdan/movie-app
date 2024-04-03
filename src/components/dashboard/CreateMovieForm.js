import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../UI/Button";
import FormInput from "../UI/FormInput";
import ImagePicker from "../UI/ImagePicker";
import { Input, Select, TextArea } from "../UI/Input";
import {
  FaAlgolia,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTags,
  FaTimes,
  FaUserTie,
} from "react-icons/fa";
import Autocomplete from "../UI/AutoSuggust";
import TagInput from "../UI/TagInput";
import Modal, { useModalWindow } from "../UI/Modal";
import DragDropVideoInput from "../UI/DragDropVideoInput";
import { useGetAllGeneras } from "../../hooks/movies/useGetAllGeneras";
import { BASE_URL } from "../../utils/data";
import { useSelector } from "react-redux";

function CreateMovieForm({ createMovieMutate }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null); // State to hold the selected actor for cast & crew
  const [role, setRole] = useState("");
  const [video, setVideo] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { data } = useGetAllGeneras();
  const isDarkMode = useSelector((state) => state.appSettings.isDarkMode);

  const toggleGenreSelection = (genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genre)) {
        return prevSelectedGenres.filter((g) => g !== genre); // Unselect
      } else {
        return [...prevSelectedGenres, genre]; // Select
      }
    });
  };
  const genreOptions = data ? data : [];

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "", // Default value for the title
      description: "", // Default value for the description
      tags: [], // Default value for tags
      director: null, // Default value for director
      writers: [], // Default value for writers
      genres: [], // Default value for genre
      type: "", // Default value for type
      language: "", // Default value for language
      releaseDate: "", // Default value for release date
      poster: null,
      casts: [],
      // Add more fields as needed
    },
  });
  const onSubmit = (formData) => {
    // Map form data to match the movie schema structure
    const movieData = {
      title: formData.title,
      description: formData.description,
      poster: formData.poster, // Assuming this is the URL or path to the poster image
      tags: formData.tags.map((tag) => tag.value), // Assuming tags are in the format { value: "tagValue", label: "TagLabel" }
      genre: formData.genres, // Assuming genre IDs are stored directly in formData.genres
      director: formData.director?.value, // Assuming director is selected using an autocomplete component and has a format { value: "directorId", label: "DirectorName" }
      writers: formData.writers?.map((writer) => writer.value), // Assuming writers are selected similarly to tags
      casts: formData.casts.map((cast) => ({
        actor: cast.actor.value, // Assuming actor object has an id field
        role: cast.role,
      })),
      language: formData.language,
      status: formData.status, // Assuming you have a status field in your form
      type: formData.type,
      releaseDate: formData.releaseDate,
      trailer: video,
    };

    console.log(movieData); // Log the formatted movie data
    createMovieMutate.mutate(movieData);
    // Here you would typically send movieData to your server/API to be saved in the database
    // Example: axios.post('/api/movies', movieData)...
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("imageFile", file); // Update form value for image file
      setImagePreview(URL.createObjectURL(file)); // Update image preview
    }
  };
  const handleAddCast = () => {
    if (selectedActor && role) {
      const newCast = { actor: selectedActor, role: role };
      const existingCasts = getValues("casts");
      setValue("casts", [...existingCasts, newCast]); // Update the casts array with the new entry
      setSelectedActor(null); // Reset selected actor
      setRole(""); // Reset role input
    }
  };
  const handleRemoveCast = (id) => {
    const existingCasts = getValues("casts");
    console.log(existingCasts, id);
    const newCasts = existingCasts.filter((cast) => cast.actor.id !== id);
    setValue("casts", newCasts); // Update the casts array with the new entry
  };
  // Define options for Select inputs
  const { onClose } = useModalWindow();

  // ... other form state and handlers

  const handleSelectGenres = () => {
    setValue("genres", selectedGenres); // Update the form state with selected genres
    onClose("genra")(); // Close the genres modal
  };

  const typeOptions = [
    { value: "", label: "Select Type" },

    { value: "Movie", label: "Movie" },
    { value: "Series", label: "TV Series" },
  ];

  const languageOptions = [
    { value: "", label: "Select language" },

    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
  ];
  const statusOptions = [
    { value: "", label: "Select status" },

    { value: "Released", label: "Released" },
    { value: "Upcoming", label: "Upcoming" },
    { value: "In Production", label: "In Production" },
  ];
  const watchedCasts = watch("casts"); // Place this inside your component
  const handleFormKeyDown = (e) => {
    // Check if Enter was pressed
    if (e.key === "Enter") {
      // Check if the focused element is part of the TagInput component
      const isTagInputFocused = e.target.classList.contains(
        "react-select__input"
      );

      if (isTagInputFocused) {
        e.preventDefault(); // Prevent form submission
        // Additional logic to manually trigger tag creation if needed
      }
    }
  };
  return (
    <>
      {!video ? (
        <DragDropVideoInput setVideo={setVideo} />
      ) : (
        <form
          onKeyDown={handleFormKeyDown} // Add this line
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-y-auto max-h-96 flex flex-col text-white"
          style={{ width: "800px" }}
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Controller
                control={control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormInput
                    label="Title"
                    placeholder="K.G.F - 2"
                    error={errors.title?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <TextArea
                    className="mb-4"
                    label="Description"
                    placeholder="Story line"
                    error={errors.description?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name="tags"
                control={control}
                rules={{ required: "Tags are required" }}
                render={({ field }) => (
                  <TagInput
                    label={"Tags"}
                    className="mb-4"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                  />
                )}
              />

              <Controller
                control={control}
                name="director"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Autocomplete
                    className="mb-4"
                    label="Director"
                    error={errors.director?.message}
                    placeholder="Search profile"
                    onChange={(selectedOption) => onChange(selectedOption)} // Pass the selected option back to react-hook-form's onChange
                    onBlur={onBlur} // Inform react-hook-form when the field is touched
                    value={value} // Pass the current value from react-hook-form to Autocomplete
                    ref={ref} // Pass the ref for react-hook-form to register the input
                  />
                )}
              />

              <Controller
                control={control}
                name="writers"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Autocomplete
                    className="mb-4"
                    label="Writers"
                    isMulti={true}
                    placeholder="Search profile"
                    error={errors.writers?.message}
                    onChange={(selectedOption) => onChange(selectedOption)} // Pass the selected option back to react-hook-form's onChange
                    onBlur={onBlur} // Inform react-hook-form when the field is touched
                    value={value} // Pass the current value from react-hook-form to Autocomplete
                    ref={ref} // Pass the ref for react-hook-form to register the input
                  />
                )}
              />

              {/* Example for Input without Controller as it's not used for submission */}
              <div className="flex justify-between w-full items-center mb-2 text-sm font-bold text-gray-300">
                <div className="text-gray-900 dark:text-gray-400">
                  Add Cast & Crew
                </div>
                <Modal.Open opens={"casts"}>
                  <Button type="button" variant={"link"}>
                    {" "}
                    <FaEye />
                  </Button>
                </Modal.Open>
              </div>

              <div className="flex justify-items-stretch items-center w-full gap-2 mb-4">
                <Autocomplete
                  key={
                    watchedCasts.length
                      ? watchedCasts.map((cast) => cast.actor.value).join("-")
                      : "cast"
                  }
                  placeholder="Search profile"
                  exclude={watchedCasts}
                  className="w-64"
                  value={selectedActor}
                  onChange={setSelectedActor} // Update selected actor state
                />

                <Input
                  placeholder="Role as"
                  value={role}
                  onChange={(e) => setRole(e.target.value)} // Update role state
                />

                <Button type="button" variant="outline" onClick={handleAddCast}>
                  <FaPlus />
                </Button>
              </div>
            </div>

            <div>
              <div className="flex w-full justify-center mb-4">
                <Controller
                  name="poster"
                  control={control}
                  rules={{ required: "poster picture is required" }}
                  render={({ field: { onChange, value } }) => (
                    <ImagePicker
                      id="poster"
                      imagePreview={imagePreview}
                      error={errors.poster?.message}
                      onImageChange={(e) => {
                        handleImageChange(e);
                        onChange(e.target.files[0]); // Update form value
                      }}
                      width="200px"
                      height="140px"
                    />
                  )}
                />
              </div>
              <Modal.Open opens={"genra"}>
                <Button
                  type="button"
                  className={"mb-4 w-full"}
                  variant={"outline"}
                >
                  <FaTags className="mr-1" /> Select Genres
                </Button>
              </Modal.Open>

              <Controller
                control={control}
                name="type"
                rules={{ required: "Type is required" }}
                render={({ field }) => (
                  <Select
                    className="mb-4"
                    label="Type"
                    error={errors.type?.message}
                    options={typeOptions}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="language"
                rules={{ required: "Language is required" }}
                render={({ field }) => (
                  <Select
                    className="mb-4"
                    label="Language"
                    error={errors.language?.message}
                    options={languageOptions}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="status"
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Select
                    className="mb-4"
                    label="Status"
                    error={errors.status?.message}
                    options={statusOptions}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="releaseDate"
                rules={{ required: "Release Date is required" }}
                render={({ field }) => (
                  <FormInput
                    error={errors.releaseDate?.message}
                    label="Release Date"
                    type="date"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <Button
            isLoading={createMovieMutate.isPending}
            variant="solid"
            className="mx-auto mt-4"
            type="submit"
          >
            Create Movie
          </Button>
        </form>
      )}
      <Modal.Window name={"casts"} isSmall={true}>
        <div className="flex text-white w-64  flex-col  space-y-4">
          <div className="mb-4">
            <h3 className="text-lg text-black dark:text-white font-semibold mb-6">
              Cast Members:
            </h3>
            <ul>
              {watchedCasts.map((cast, index) => (
                <li key={index}>
                  <div className="flex w-64 items-center my-2">
                    <img
                      src={`${BASE_URL}/` + cast.actor.image}
                      alt={cast.actor.label}
                      className="w-10 h-10 mr-2" // Tailwind classes for styling
                    />
                    <div className="flex-grow flex flex-col">
                      <span className="dark:text-white text-black">
                        {cast.actor.label}{" "}
                      </span>
                      <span className="text-gray-500  text-sm">
                        {cast.role}
                      </span>
                    </div>

                    <FaTimes
                      className="ml-3 transition-colors cursor-pointer duration-200 ease-in-out text-black dark:text-white hover:text-red-500"
                      onClick={() => {
                        handleRemoveCast(cast.actor.id);
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal.Window>

      <Modal.Window name={"genra"} isSmall={true}>
        <div className="flex flex-col min-h-96 ">
          <div className="flex items-start flex-wrap gap-y-2 gap-2 w-96 ">
            {" "}
            {/* Adjust the styling as needed */}
            {genreOptions.map((genre) => (
              <button
                key={genre.id}
                className={`p-2 border-2 ${
                  selectedGenres.includes(genre.id)
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white" // Colors when selected
                    : "text-black border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black" // Colors when not selected
                } transition-colors text-xs font-bold rounded-md`} // Tailwind classes for styling
                onClick={() => toggleGenreSelection(genre.id)}
              >
                {genre.value}
              </button>
            ))}
          </div>
          <div className="flex mt-auto justify-end ">
            <Button variant="solid" onClick={handleSelectGenres}>
              Select
            </Button>
          </div>
        </div>
      </Modal.Window>
    </>
  );
}

export default CreateMovieForm;
