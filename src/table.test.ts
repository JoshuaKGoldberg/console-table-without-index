import { describe, expect, it, vi } from "vitest";

import logger, { colorDump } from "./not-a-log.js";
import { table } from "./table.js";

const mockShouldColorize = vi.fn().mockReturnValue(false);

vi.mock("./should-colorize.js", () => ({
	get shouldColorize() {
		return mockShouldColorize;
	},
}));

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
		{
			"𝖮𝖧 𝖭𝖮": { a: "foo", b: "bar" },
			好好好好好: { a: "foo", b: "bar" },
		},
		{
			"a│b": { a: "foo", b: "bar" },
			café: { a: "foo", b: "bar" },
		},
	])("%j", (input) => {
		expect({
			original: "\n" + logger.table(input),
			result: "\n" + table(input),
		}).toMatchSnapshot();
	});

	describe("with color", () => {
		it.each([
			["colored values", [{ amount: 5, date: "2024-10-22" }]],
			[
				"a colored index column",
				new Map([
					["apple", "🍏"],
					["banana", "🍌"],
				]),
			],
		])("%s", (_, input) => {
			mockShouldColorize.mockReturnValue(true);

			expect({
				original: "\n" + colorDump.table(input),
				result: "\n" + table(input),
			}).toMatchSnapshot();
		});
	});
});
