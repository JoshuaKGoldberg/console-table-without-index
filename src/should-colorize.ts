import { WriteStream } from "node:tty";

// Mirrors how Node.js's console decides whether to colorize output:
// https://github.com/nodejs/node/blob/main/lib/internal/util/colors.js
export function shouldColorize() {
	if (process.env.FORCE_COLOR !== undefined) {
		return WriteStream.prototype.getColorDepth() > 2;
	}

	const { stdout } = process;

	return stdout.isTTY && stdout.getColorDepth() > 2;
}
