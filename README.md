<h1 align="center"><code>console.table</code> Without <code>(index)</code></h1>

<p align="center">The built-in Node.js <code>console.table</code>, but without the annoying <code>(index)</code> column. 📊</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 2" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-2-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/console-table-without-index/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/console-table-without-index" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/console-table-without-index?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/console-table-without-index/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/console-table-without-index"><img alt="📦 npm version" src="https://img.shields.io/npm/v/console-table-without-index?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

Without this utility:

```js
console.table([
	{ emoji: "🍏", fruit: "apple" },
	{ emoji: "🍌", fruit: "banana" },
	{ emoji: "🍒", fruit: "cherry" },
]);
```

```plaintext
┌─────────┬───────┬──────────┐
│ (index) │ emoji │ fruit    │
├─────────┼───────┼──────────┤
│ 0       │ '🍏'  │ 'apple'  │
│ 1       │ '🍌'  │ 'banana' │
│ 2       │ '🍒'  │ 'cherry' │
└─────────┴───────┴──────────┘
```

Look at that `(index)` column!
Wouldn't it be nice to get rid of it if you don't need it?

## Usage

With this utility:

```shell
npm i console-table-without-index
```

```ts
import { table } from "console-table-without-index";

console.log(
	table([
		{ emoji: "🍏", fruit: "apple" },
		{ emoji: "🍌", fruit: "banana" },
		{ emoji: "🍒", fruit: "cherry" },
	]),
);
```

```plaintext
┌───────┬──────────┐
│ emoji │ fruit    │
├───────┼──────────┤
│ '🍏'  │ 'apple'  │
│ '🍌'  │ 'banana' │
│ '🍒'  │ 'cherry' │
└───────┴──────────┘
```

Hooray!
No more `(index)`!
🙌

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.craigory.dev/"><img src="https://avatars.githubusercontent.com/u/6933928?v=4?s=100" width="100px;" alt="Craigory Coppola"/><br /><sub><b>Craigory Coppola</b></sub></a><br /><a href="#ideas-AgentEnder" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/console-table-without-index/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="https://github.com/JoshuaKGoldberg/console-table-without-index/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app).
