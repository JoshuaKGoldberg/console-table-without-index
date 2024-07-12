import logger from "not-a-log";

export type TableParameters = Parameters<(typeof logger)["table"]>;

export function table(...parameters: TableParameters): string {
	const original = logger.table(...parameters);

	// Tables should all start with roughly:
	// ┌─────────┬──────
	// │ (index) │
	// ├─────────┼
	const columnWidth = original.indexOf("┬─");

	const trimmed = original
		.split("\n")
		.map((line) => line.slice(columnWidth))
		.join("\n");

	return "┌" + trimmed.slice(1);
}
