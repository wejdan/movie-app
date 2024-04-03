import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import MovieCard from "./MovieCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetMoviesByGenra } from "../../hooks/movies/useGetMoviesByGenra";
import { BASE_URL, movies } from "../../utils/data";
import { NavLink } from "react-router-dom";

const PrevArrow = (props) => {
  const { className, style, onClick, isVisible, slideCount, slidesToShow } =
    props;
  if (slideCount <= slidesToShow) return null;

  return (
    <button
      onClick={onClick}
      className={`absolute left-5 z-[9999] -translate-x-1/2 transform top-1/2 -translate-y-1/2 text-white p-2 rounded-full focus:outline-none transition-opacity duration-300 ease-in-out text-3xl ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ ...style }}
      aria-label="Scroll left"
    >
      &#10094;
    </button>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick, isVisible, slideCount, slidesToShow } =
    props;
  if (slideCount <= slidesToShow) return null;

  return (
    <button
      onClick={onClick}
      className={`absolute right-10 z-[9999] translate-x-1/2 transform top-1/2 -translate-y-1/2 text-white p-2 rounded-full focus:outline-none transition-opacity duration-300 ease-in-out text-3xl ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ ...style }}
      aria-label="Scroll right"
    >
      &#10095;
    </button>
  );
};

const MoviesList = ({ genre }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { data, isLoading } = useGetMoviesByGenra(genre.id);
  const [infinite, setInfinite] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const calculateCardWidth = () => {
    // Define breakpoints and corresponding card widths
    const breakpoints = {
      // Assuming these are the max-widths for each breakpoint
      sm: 600, // Small devices
      md: 1024, // Medium devices
      lg: 1440, // Large devices
      // Add as many breakpoints as you need
    };

    // Determine cardWidth based on the current windowWidth
    if (windowWidth < breakpoints.sm) {
      return 190; // Adjust to your preferred width for small devices
    } else if (windowWidth >= breakpoints.sm && windowWidth < breakpoints.md) {
      return 230; // Adjust to your preferred width for medium devices
    } else if (windowWidth >= breakpoints.md && windowWidth < breakpoints.lg) {
      return 240; // Adjust to your preferred width for large devices
    } else {
      return 250; // Default card width for extra large devices or any other size
    }
  };

  useEffect(() => {
    if (!data) return;
    // Assuming each movie card has a fixed width of 200px, adjust this value as necessary
    const cardWidth = calculateCardWidth(); // Adjust based on your actual card width
    const totalContentWidth = data.movies?.length * cardWidth;
    setInfinite(totalContentWidth > windowWidth);
  }, [data, windowWidth]);

  if (isLoading || !data?.movies?.length) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: infinite,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow isVisible={isHovered && infinite} />,
    prevArrow: <PrevArrow isVisible={isHovered && infinite} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // You can fine-tune this value as needed
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // You can fine-tune this value as needed
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // You can fine-tune this value as needed
        },
      },
      // You can add more breakpoints if needed
    ],
  };
  return (
    <div
      className="px-10  relative my-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink
        to={`/category/${genre.id}`}
        className="text-black dark:text-white font-bold capitalize text-xl"
      >
        {genre.value}
      </NavLink>
      <Slider
        className={`mx-auto ${!infinite ? "align-left" : ""}`}
        {...settings}
      >
        {data.movies.map((movie, index) => (
          <div key={index}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              thumbnail={`${BASE_URL}/` + movie.poster}
              rating={movie.rating}
              info={movie.info}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MoviesList;
