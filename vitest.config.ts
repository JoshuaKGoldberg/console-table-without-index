import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			all: true,
			exclude: ["lib", "src/not-a-log"],
			include: ["src"],
			reporter: ["html", "lcov"],
		},
		exclude: ["lib", "node_modules"],
		setupFiles: ["console-fail-test/setup"],
	},
});
