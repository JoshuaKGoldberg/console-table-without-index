/*! not-a-logger. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

// Ported locally because not-a-log doesn't publish its own types:
// https://github.com/vitest-dev/vitest/issues/6115
// https://github.com/jimmywarting/not-a-log/issues/2
// https://github.com/JoshuaKGoldberg/console-table-without-index/issues/374

import { Console } from "node:console";
import { Transform } from "node:stream";

type Dump = {
	[K in keyof Console]: Console[K] extends (...args: infer Args) => unknown
		? (...args: Args) => string
		: never;
};

type LoggerMethod = (...args: unknown[]) => void;

const stream = new Transform({
	transform: (chunk, _, callback) => {
		callback(null, chunk);
	},
});

const logger = new Console({
	colorMode: false,
	stderr: stream,
	stdout: stream,
});

const handler: ProxyHandler<LoggerMethod> = {
	apply(target, _, args) {
		Reflect.apply(target, logger, args);
		return (stream.read() as Buffer | null)?.toString() ?? "";
	},
};

const dump = new Proxy(logger, {
	get(target, property) {
		return Reflect.has(target, property)
			? new Proxy(Reflect.get(target, property) as LoggerMethod, handler)
			: undefined;
	},
}) as unknown as Dump;

export default dump;
