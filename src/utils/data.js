import { v4 as uuidv4 } from "uuid";

const m = [
  {
    title: "Marakkar: Lion of the Arabian Sea",
    thumbnail:
      "https://img.buzzfeed.com/buzzfeed-static/complex/images/wjnhpz3osrai5aningjl/titanic.jpg",
    rating: "9.0",
    info: "Historical Drama",
  },

  // ... other movies
];
export const movies = m.map((movie) => ({
  ...movie,
  id: uuidv4(), // This will generate a unique UUID for each movie
}));

const actorsList = [
  {
    name: "Leonardo DiCaprio",
    description: "Leonardo Wilhelm DiCaprio is an American actor and producer.",
    imageUrl:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/435_v9_bc.jpg",
  },
  {
    name: "Kate Winslet",
    description: "Kate Elizabeth Winslet CBE is an English actress.",
    imageUrl:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/70811_v9_bb.jpg",
  },
  {
    name: "Tom Cruise",
    description: "Thomas Cruise Mapother IV is an American actor and producer.",
    imageUrl:
      "https://th.bing.com/th?id=OSK.HERO5kBRpM1SpJ0cTiOrE0sZDv_xkUSvclM-GiGS8AR7Xh0&w=472&h=280&c=13&rs=2&o=6&dpr=1.1&pid=SANGAM",
  },
  {
    name: "Michelle Williams",
    description: "Michelle Ingrid Williams is an American actress.",
    imageUrl:
      "https://th.bing.com/th?id=OSK.HEROlrgPOlUTYCRehS9UpCjLdq8CeBtpNGXTCnt8COVyjIE&w=472&h=280&c=13&rs=2&o=6&oif=webp&dpr=1.1&pid=SANGAM",
  },
  {
    name: "Robert Pattinson",
    description: "Robert Douglas Thomas Pattinson is an English actor.",
    imageUrl:
      "https://th.bing.com/th?id=OSK.HERO5J2BtBRDcVW7-pkKBpJIK52fuDza7UdDIupIVvpIf1o&w=472&h=280&c=13&rs=2&o=6&dpr=1.1&pid=SANGAM",
  },
  {
    name: "Matt Reeves",
    description:
      "Matt Reeves is an American film director, producer, and screenwriter.",
    imageUrl:
      "https://th.bing.com/th/id/OSK.HEROFVX-GttrhqKljrnWQbWf6dWk1rlWTzFZYJBDVEqVh3Q?rs=1&pid=ImgDetMain",
  },
  {
    name: "Prabhas",
    description:
      "Uppalapati Venkata Suryanarayana Prabhas Raju is an Indian film actor.",
    imageUrl:
      "https://th.bing.com/th?id=OSK.HEROyjFrQQ7oENwdKWzeG8VRjszH7kE8CYB66fHTj3C-pyA&w=472&h=280&c=13&rs=2&o=6&dpr=1.1&pid=SANGAM",
  },
  {
    name: "Rashmika Mandanna",
    description: "Rashmika Mandanna is an Indian actress and model.",
    imageUrl:
      "https://th.bing.com/th?id=OSK.HERO9CbtbyX9be5SZvg4NPPLomYg3IShcGWc4cq4MviVDIc&w=472&h=280&c=13&rs=2&o=6&oif=webp&dpr=1.1&pid=SANGAM",
  },
  {
    name: "Sanjay Dutt",
    description:
      "Sanjay Balraj Dutt is an Indian actor who works in Hindi films.",
    imageUrl:
      "https://th.bing.com/th/id/OSK.HEROTKWYGhaGk5rIpH4tUrkyUEDdUOI9ogQ2mM61h1tAdQI?rs=1&pid=ImgDetMain",
  },
  {
    name: "Sukumar",
    description: "Sukumar Bandreddi is an Indian film director and producer.",
    imageUrl:
      "https://th.bing.com/th/id/OIP.vF1JgTbNcNrwNAcyqRmCQAHaFj?rs=1&pid=ImgDetMain",
  },
];

export const actors = actorsList.map((actor) => ({
  ...actor,
  id: uuidv4(), // This will generate a unique UUID for each movie
}));
export const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
