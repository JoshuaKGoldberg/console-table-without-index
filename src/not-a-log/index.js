/*! not-a-logger. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

// Copied to a local import because Vitest crashes on it:
// https://github.com/vitest-dev/vitest/issues/6115

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

import { Console } from "console";
import { Transform } from "stream";

const ts = new Transform({ transform: (chunk, _, cb) => cb(null, chunk) });
const logger = new Console({ colorMode: false, stderr: ts, stdout: ts });
const handler = {
	apply(target, _, args) {
		target.apply(logger, args);
		return (ts.read() || "").toString();
	},
	get(_, prop) {
		return new Proxy(logger[prop], handler);
	},
};

const dump = new Proxy(logger, handler);
export default dump;

/* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
