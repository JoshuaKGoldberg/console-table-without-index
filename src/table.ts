import stringWidth from "string-width";

import logger, { colorDump } from "./not-a-log.js";
import { shouldColorize } from "./should-colorize.js";

export interface TableOptions {
	/**
	 * Whether to skip colorizing values, even if console.table would colorize.
	 */
	plain?: boolean;
}

export type TableParameters = Parameters<(typeof logger)["table"]>;

const ansiEscape = new RegExp(`(${String.fromCodePoint(27)}\\[[\\d;]*m)`);

const segmenter = new Intl.Segmenter();

export function table(
	tabularData: TableParameters[0],
	properties?: TableParameters[1],
	{ plain }: TableOptions = {},
): string {
	const original = (!plain && shouldColorize() ? colorDump : logger).table(
		tabularData,
		properties,
	);

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
