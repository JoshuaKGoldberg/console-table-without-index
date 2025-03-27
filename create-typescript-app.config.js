import {
	blockCTATransitions,
	blockESLint,
	createConfig,
} from "create-typescript-app";

export default createConfig({
	refinements: {
		addons: [
			blockESLint({
				ignores: ["src/not-a-log"],
			}),
		],
		blocks: {
			add: [blockCTATransitions],
		},
	},
});
