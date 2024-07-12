/* eslint-disable @typescript-eslint/no-explicit-any, no-var */
import { Console } from "console";
type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
	...a: Parameters<T>
) => TNewReturn;
type Dump = { [K in keyof Console]: ReplaceReturnType<Console[K], string> };
var dump: Dump;
export = dump;
/* eslint-enable @typescript-eslint/no-explicit-any, no-var */
