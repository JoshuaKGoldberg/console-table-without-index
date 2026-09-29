import { WriteStream } from "node:tty";

export function shouldColorize() {
	if (process.env.FORCE_COLOR !== undefined) {
		return WriteStream.prototype.getColorDepth() > 2;
	}

	const { stdout } = process;

	return stdout.isTTY && stdout.getColorDepth() > 2;
}
