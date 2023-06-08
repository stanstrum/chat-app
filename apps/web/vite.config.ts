import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { z } from "zod";
import { processEnv } from "tools";

const env = processEnv({
	WEB_PORT: z.number().int().gte(0).lte(65535).default(5173)
});

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: env.WEB_PORT
	}
});
