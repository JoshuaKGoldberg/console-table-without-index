import { describe, expect, it } from "vitest";

import logger from "./not-a-log.js";

describe("not-a-log", () => {
	it("returns undefined for a property not on the console", () => {
		expect((logger as unknown as Record<string, unknown>).then).toBeUndefined();
	});

	it("can be resolved as a promise value", async () => {
		await expect(
			import("./not-a-log.js").then((module) => module.default),
		).resolves.toBe(logger);
	});
});
