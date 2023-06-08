import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

import { z } from "zod";

export default defineConfig(({ mode }) => {
	const env = z.object({
		WEB_PORT: z.string().nonempty().default("5173"),
		NODE_ENV: z.string()
	}).parse({
		...process.env,
		...loadEnv(mode, process.cwd(), "")
	});

	const port = Number.parseInt(env.WEB_PORT);

	if (Number.isNaN(port))
		throw new Error(`Port is invalid: "${env.WEB_PORT}"`);

	return {
		plugins: [sveltekit()],
		server: {
			port,
			strictPort: true
		}
	};
});
