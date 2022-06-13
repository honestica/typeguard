module.exports = {
  "package.json": ["yarn packagejson:format", "yarn packagejson:lint"],
  "**/*.ts": () => ["tsc -p tsconfig.json --noEmit"],
  "**/*.{ts,mts,cts,js,mjs,cjs}": (filenames) => `eslint ${filenames.join(" ")} --fix --cache`,
  "*": (filenames) => `prettier --ignore-unknown --write ${filenames.join(" ")}`,
  "**/*.md": (filenames) => `markdownlint-cli2-fix ${filenames.join(" ")}`,
};
