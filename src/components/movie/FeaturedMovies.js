// Import react-slick and its styles
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "../../utils/data";
import { useGetFeaturedMovies } from "../../hooks/movies/useGetFeaturedMovies";
import { useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";

// Custom arrow components using Tailwind CSS for styling
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-0 z-10 cursor-pointer bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2"
  >
    {/* You can use an SVG or an icon library like Heroicons */}
    {"<"}
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-0 z-10 cursor-pointer bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2"
  >
    {/* You can use an SVG or an icon library like Heroicons */}
    {">"}
  </div>
);

const FeaturedMovies = () => {
  const { data: movies, isLoading } = useGetFeaturedMovies();

  // Ensure centerMode is false and remove variableWidth if you want a fixed width slide
  const isDarkMode = useSelector((state) => state.appSettings.isDarkMode);
  const colorsLightMode = "#B8860B"; // Darker gold to gold gradient for light mode
  const colorsDarkMode = "#C99500";
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: false,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <InfinitySpin
          visible={true}
          width="200"
          color={isDarkMode ? colorsDarkMode : colorsLightMode}
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-screen-lg px-4">
        <Slider {...settings}>
          {movies?.map((movie) => {
            const imageUrl = `${BASE_URL}/${movie.poster.replace(/\\/g, "/")}`;

            return (
              <div key={movie.id} className="outline-none focus:outline-none">
                <div className="w-full h-[600px] relative mx-auto overflow-hidden flex justify-center">
                  {/* Hover effect container */}
                  <div className="group relative  inline-block ">
                    {/* Image with scale effect and dark overlay on hover */}
                    <div className="transition-transform duration-300 ease-in-out group-hover:scale-105">
                      {/* Image */}
                      <img
                        src={imageUrl}
                        alt={movie.title}
                        className="h-full w-auto object-cover"
                        style={{ height: "600px", objectFit: "contain" }}
                      />
                      {/* Darkening overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50"></div>
                      {/* Gradient overlay */}
                      <div
                        className={`absolute  bottom-0 left-0 w-full ${
                          isDarkMode ? "h-96" : "h-96"
                        } bg-gradient-to-b ${
                          isDarkMode
                            ? "from-transparent to-gray-900"
                            : "from-transparent to-gray-100"
                        }`}
                      ></div>
                    </div>
                    {/* Content that appears on hover */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      <h2 className="text-xl font-bold">{movie.title}</h2>
                      <p className="px-2 font-semibold text-center">
                        {movie.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
        {/* Your custom arrows here */}
      </div>
    </div>
  );
};

export default FeaturedMovies;
