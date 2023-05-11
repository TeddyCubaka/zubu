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
		borderRadius: {
			none: "0",
			sm: "3",
			DEFAULT: "5px",
			md: "8",
			lg: "11",
			full: "9999px",
			large: "15px",
			xl: "18",
			"2xl": "23px",
			"3xl": "25px",
		},
		extend: {},
	},
	plugins: [],
};
