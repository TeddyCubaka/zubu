/** @type {import('tailwindcss').Config} */
export default exports = {
	important: true,
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		borderRadius: {
			none: "0",
			sm: "3px",
			DEFAULT: "5px",
			md: "8px",
			lg: "11px",
			full: "9999px",
			large: "15px",
			xl: "18px",
			"2xl": "23px",
			"3xl": "25px",
		},
		extend: {
			color: {
				blue: "#123853",
				skyblue: "#25a5c4",
				"lite-skyblue": "#00b1ca",
				"app-gray": "#d9d9d9",
				"transparent-blue": "#123853b4",
				"app-blue": "#123853",
				"app-lite-skyblue": "#00b1ca",
				"app-skyblue": "#25a5c4",
				"app-transparent-blue": "#123853b4",
			},
		},
	},
	plugins: [],
};
