import { v4 as uuidv4 } from "uuid";

const m = [
  {
    title: "Marakkar: Lion of the Arabian Sea",
    thumbnail:
      "https://img.buzzfeed.com/buzzfeed-static/complex/images/wjnhpz3osrai5aningjl/titanic.jpg",
    rating: "9.0",
    info: "Historical Drama",
  },
  {
    title: "The Forgotten Battle",
    thumbnail: "https://i.ebayimg.com/images/g/0gYAAOSwEWNco-gj/s-l1600.jpg",
    rating: "8.5",
    info: "War Drama",
  },
  {
    title: "Space Sweepers",
    thumbnail:
      "https://media.comicbook.com/2017/10/iron-man-movie-poster-marvel-cinematic-universe-1038878.jpg",
    rating: "7.9",
    info: "Sci-Fi Adventure",
  },
  {
    title: "Shadow in the Cloud",
    thumbnail:
      "https://cdn.europosters.eu/image/350/posters/dune-part-1-i122815.jpg",
    rating: "7.1",
    info: "Action Horror",
  },
  {
    title: "The Last Duel",
    thumbnail:
      "https://lwlies.com/wp-content/uploads/2017/11/split-900x0-c-default.jpg",
    rating: "8.2",
    info: "Historical Epic",
  },
  {
    title: "Voyage of Time",
    thumbnail:
      "https://www.tallengestore.com/cdn/shop/products/JohnWick-KeanuReeves-HollywoodEnglishActionMoviePoster-2_c927bf3a-7e64-4c67-b05f-960c2f2cd3d0.jpg?v=1649071611",
    rating: "8.0",
    info: "Documentary",
  },
  {
    title: "Inception",
    thumbnail:
      "https://intheposter.com/cdn/shop/products/the-front-line-in-the-poster-1_1600x.jpg?v=1694762475",
    rating: "8.8",
    info: "Sci-Fi Thriller",
  },
  {
    title: "Interstellar",
    thumbnail: "https://example.com/path-to-interstellar-thumbnail.jpg",
    rating: "8.6",
    info: "Space Adventure",
  },
  {
    title: "The Revenant",
    thumbnail: "https://i.ebayimg.com/images/g/SQcAAOSwBxhkOA-s/s-l1600.jpg",
    rating: "8.0",
    info: "Survival Drama",
  },
  {
    title: "Parasite",
    thumbnail:
      "https://m.media-amazon.com/images/I/51gjEOMj3gL._AC_UF1000,1000_QL80_.jpg",
    rating: "8.6",
    info: "Thriller",
  },
  {
    title: "Blade Runner 2049",
    thumbnail:
      "https://kiranjitchanamediahome.files.wordpress.com/2019/02/canva-monochrome-horror-movie-poster-macgp3s1byu.jpg?w=1100",
    rating: "8.0",
    info: "Neo-noir Sci-Fi",
  },
  {
    title: "Mad Max: Fury Road",
    thumbnail: "https://www.dotyeti.com/wp-content/uploads/2023/01/barbie.webp",
    rating: "8.1",
    info: "Action Adventure",
  },
  {
    title: "The Grand Budapest Hotel",
    thumbnail:
      "https://artofthemovies.co.uk/cdn/shop/files/IMG_4154_1-780453_de0cc110-550d-4448-a7ec-d3ff945c0739.jpg?v=1696169470",
    rating: "8.1",
    info: "Comedy Drama",
  },
  {
    title: "Her",
    thumbnail: "https://img.fruugo.com/product/9/32/14416329_max.jpg",
    rating: "8.0",
    info: "Romantic Sci-Fi",
  },
  {
    title: "Moonlight",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJPI_sPw-oWsKgVHJoej-L6CWovOxiSDiVtg&usqp=CAU",
    rating: "7.4",
    info: "Drama",
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
