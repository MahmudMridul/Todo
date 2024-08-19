/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx}"],
   theme: {
      screens: {
         mob: "425px",
         tabS: "600px",
         tabL: "768px",
         lap: "1024px",
         big: "1200px",
      },
      container: {
         center: true,
      },
      extend: {},
   },
   plugins: [],
};
