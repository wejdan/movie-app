import React from "react";
import "swiper/css";
import "swiper/css/navigation";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";

// Install Swiper modules

import MovieCard from "./MovieCard";
import { movies } from "../../utils/data"; // Assume this is your movies data

// install Swiper modules
SwiperCore.use([Navigation]);

const MoviesList = ({ genre }) => {
  return (
    <div className="my-6">
      <h2 className="text-white font-bold capitalize text-xl mb-4">
        {genre.value}
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={"auto"}
        navigation={true}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              thumbnail={movie.thumbnail}
              rating={movie.rating}
              info={movie.info}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoviesList;
