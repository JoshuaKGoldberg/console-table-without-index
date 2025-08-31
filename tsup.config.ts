import { defineConfig } from "tsup";

export default defineConfig({
	bundle: false,
	clean: true,
	dts: true,
	entry: ["src/**/*.ts", "!src/**/*.test.*", "src/**/*.js"],
	format: "esm",
	outDir: "lib",
});
