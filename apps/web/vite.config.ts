import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tanstackRouter from "@tanstack/router-plugin/vite";

export default defineConfig({
		plugins: [
				tanstackRouter({
						target: "react",
						autoCodeSplitting: true,
				}),
				react()
		],
		server: {
				port: 3000,
				proxy: {
						'/api': {
								target: 'http://localhost:3001',
								changeOrigin: true,
						},
						'/trpc': {
								target: 'http://localhost:3001',
								changeOrigin: true,
						},
				},
		},
});