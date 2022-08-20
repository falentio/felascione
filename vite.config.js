import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	define: {
		__BUILD_TIMESTAMP__: Date.now()
	}
};

export default config;
