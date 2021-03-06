module.exports = {
	"package.json": ['yarn packagejson:format', 'yarn packagejson:check'],
	"**/*.ts": () => ["tsc -p tsconfig.json --noEmit"],
	"**/*.{ts,mts,cts,js,mjs,cjs}": (filenames) => `eslint -c .eslintrc.cjs ${filenames.join(" ")} --fix --cache`,
};
