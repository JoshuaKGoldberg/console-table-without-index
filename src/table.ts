import stringWidth from "string-width";

import logger, { colorDump } from "./not-a-log.js";
import { shouldColorize } from "./should-colorize.js";

export type TableParameters = Parameters<(typeof logger)["table"]>;

// Color codes emitted by util.inspect, such as \u001B[33m
// eslint-disable-next-line no-control-regex -- matching the ESC control character is the point
const ansiEscape = /(\u001B\[[\d;]*m)/;

const segmenter = new Intl.Segmenter();

export function table(...parameters: TableParameters): string {
	const original = (shouldColorize() ? colorDump : logger).table(...parameters);

	// Tables should all start with roughly:
	// ┌─────────┬──────
	// │ (index) │
	// ├─────────┼
	const columnWidth = original.indexOf("┬") + 1;

	const trimmed = original
		.split("\n")
		.map(
			(line) =>
				line.charAt(0) + line.slice(findIndexAtWidth(line, columnWidth)),
		)
		.join("\n");

	return trimmed;
}

function findIndexAtWidth(line: string, targetWidth: number) {
	let offset = 0;
	let width = 0;

	// Odd-indexed parts are captured color codes, which have no display width
	for (const [partIndex, part] of line.split(ansiEscape).entries()) {
		if (partIndex % 2 === 0) {
			for (const { index, segment } of segmenter.segment(part)) {
				if (width >= targetWidth) {
					return offset + index;
				}

				width += stringWidth(segment);
			}
		}

		offset += part.length;
	}

	return line.length;
}
