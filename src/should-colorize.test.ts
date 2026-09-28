import { afterEach, describe, expect, it, vi } from "vitest";

import { shouldColorize } from "./should-colorize.js";

function stubStdout(isTTY: boolean, colorDepth = 8) {
	vi.spyOn(process, "stdout", "get").mockReturnValue({
		getColorDepth: () => colorDepth,
		isTTY,
	} as typeof process.stdout);
}

describe("shouldColorize", () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllEnvs();
	});

	it("returns true when FORCE_COLOR enables colors", () => {
		vi.stubEnv("FORCE_COLOR", "1");
		stubStdout(false);

		expect(shouldColorize()).toBe(true);
	});

	it("returns false when FORCE_COLOR disables colors", () => {
		vi.stubEnv("FORCE_COLOR", "0");
		stubStdout(true);

		expect(shouldColorize()).toBe(false);
	});

	it("returns false when stdout is not a TTY", () => {
		vi.stubEnv("FORCE_COLOR", undefined);
		stubStdout(false);

		expect(shouldColorize()).toBe(false);
	});

	it("returns false when stdout is a TTY without color support", () => {
		vi.stubEnv("FORCE_COLOR", undefined);
		stubStdout(true, 1);

		expect(shouldColorize()).toBe(false);
	});

	it("returns true when stdout is a TTY with color support", () => {
		vi.stubEnv("FORCE_COLOR", undefined);
		stubStdout(true, 8);

		expect(shouldColorize()).toBe(true);
	});
});
