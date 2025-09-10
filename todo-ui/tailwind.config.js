/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		screens: {
			mobM: "375px",
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
