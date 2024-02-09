module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        sm: "640px", // Set the small container max-width as you need
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  //,
  variants: {
    extend: {},
  },
  plugins: [],
};
