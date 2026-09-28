import stringWidth from "string-width";

import logger from "./not-a-log.js";

export type TableParameters = Parameters<(typeof logger)["table"]>;

const segmenter = new Intl.Segmenter();

export function table(...parameters: TableParameters): string {
	const original = logger.table(...parameters);

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
	let width = 0;

	for (const { index, segment } of segmenter.segment(line)) {
		if (width >= targetWidth) {
			return index;
		}

		width += stringWidth(segment);
	}

	return line.length;
}
