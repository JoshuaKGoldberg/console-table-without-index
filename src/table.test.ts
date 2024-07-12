import { describe, expect, it, vi } from "vitest";

import { table } from "./table.js";

// https://github.com/vitest-dev/vitest/issues/6115
// This is a direct copy & paste of node_modules/not-a-log/not-a-log.js
/*! not-a-logger. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
vi.mock("not-a-log", async () => {
	const { Console } = await import("console");
	const { Transform } = await import("stream");

	const ts = new Transform({
		transform: (chunk, _, cb) => {
			cb(null, chunk);
		},
	});
	const logger = new Console({ colorMode: false, stderr: ts, stdout: ts });
	const handler = {
		/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
		// @ts-ignore
		apply(target, _, args) {
			target.apply(logger, args);
			return (ts.read() || "").toString();
		},
		// @ts-ignore
		get(_, prop) {
			// @ts-ignore
			return new Proxy(logger[prop], handler);
		},
		/* eslint-enable */
	};

	const dump = new Proxy(logger, handler);
	return {
		default: dump,
	};
});

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
	])("%j", async (input) => {
		expect({
			original: "\n" + (await import("not-a-log")).default.table(input),
			result: "\n" + table(input),
		}).toMatchSnapshot();
	});
});
