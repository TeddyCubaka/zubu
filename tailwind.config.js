/** @type {import('tailwindcss').Config} */
export default exports = {
	important: true,
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		color: {
			blue: "#123853",
			"lite-skyblue": "#00b1ca",
			skyblue: "#25a5c4",
			"transparent-blue": "#123853b4",
			"app-blue": "#123853",
			"app-lite-skyblue": "#00b1ca",
			"app-skyblue": "#25a5c4",
			"app-transparent-blue": "#123853b4",
		},
		extend: {},
	},
	plugins: [],
};
