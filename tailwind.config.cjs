const config = {
	mode: "jit",
	darkMode: "class",
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {
			fontFamily: {
				abel: ["Abel", "sans-serif"],
				cinzel: ["Cinzel", "serif"]
			},
			colors: {
				pastel: {
					blue: "#9adcff",
					yellow: "#fff89a",
					peach: "#ffb2a6",
					pink: "#ff8aae"
				}
			}
		}
	},

	plugins: []
};

module.exports = config;
