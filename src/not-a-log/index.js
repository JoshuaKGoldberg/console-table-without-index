/*! not-a-logger. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

// TODO: Replace this copied code with the actual 'not-a-log' dependency:
// https://github.com/JoshuaKGoldberg/console-table-without-index/issues/374
import { Console } from "node:console";
import { Transform } from "node:stream";

const ts = new Transform({ transform: (chunk, _, cb) => cb(null, chunk) });
const logger = new Console({ stdout: ts, stderr: ts, colorMode: false });
const { has, get, apply } = Reflect;

const getProxy = (t) =>
	new Proxy(t, {
		get: (...args) => (has(...args) ? getProxy(get(...args)) : undefined),
		apply: (...args) => (apply(...args), (ts.read() || "").toString()),
	});

/** @type {import('./types.d.ts').Dump} */
export default getProxy(logger);
