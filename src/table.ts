import logger from "not-a-log";

export type TableParameters = Parameters<(typeof logger)["table"]>;

export function table(...parameters: TableParameters): string {
	const original = logger.table(...parameters);

	// Tables should all start with roughly:
	// ┌─────────┬──────
	// │ (index) │
	// ├─────────┼
	const columnWidth = original.indexOf("┬") + 1;

	return original
		.split("\n")
		.map((line) => line.charAt(0) + line.slice(columnWidth))
		.join("\n");
}
