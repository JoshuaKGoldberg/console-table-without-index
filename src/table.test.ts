import { describe, expect, it } from "vitest";

import logger from "./not-a-log.js";
import { table } from "./table.js";

describe("table", () => {
	it.each([
		["🍏", "🍌", "🍒"],
		[["🍏", "🍌", "🍒"]],
		[[["🍏", "🍌", "🍒"]]],
		{ emoji: "🍏", fruit: "apple" },
		[
			{ emoji: "🍏", fruit: "apple" },
			{ emoji: "🍌", fruit: "banana" },
			{ emoji: "🍒", fruit: "cherry" },
		],
		[
			[
				{ emoji: "🍏", fruit: "apple" },
				{ emoji: "🍌", fruit: "banana" },
				{ emoji: "🍒", fruit: "cherry" },
			],
		],
	])("%j", (input) => {
		expect({
			original: "\n" + logger.table(input),
			result: "\n" + table(input),
		}).toMatchSnapshot();
	});
});
