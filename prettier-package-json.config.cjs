module.exports = {
	useTabs: true,
	tabWidth: 4,
	expandUsers: true,
	keyOrder: [
		/**
		* Details
		*/
		"$schema",
		"name",
		"version",
		"description",
		"author",
		"maintainers",
		"contributors",
		"homepage",
		"bugs",

		/**
		* Package publishing configuration
		*/
		"license",
		"private",
		"repository",
		"publishConfig",
		"type",

		/**
		* Configuration
		*/
		"main",
		"module",
		"bin",
		"browser",
		"exports",
		"files",
		"types",
		"man",
		"preferGlobal",
		"directories",
		"scripts",
		"config",
		"sideEffects",
		"typings",

		/**
		* Dependencies
		*/
		"dependencies",
		"bundleDependencies",
		"bundledDependencies",
		"peerDependencies",
		"peerDependenciesMeta",
		"optionalDependencies",
		"devDependencies",

		/**
		* Yarn specific
		*/
		"workspaces",
		"resolutions",

		/**
		* Constraints
		*/
		"packageManager",
		"engines",
		"engineStrict",
		"os",
		"cpu",

		/**
		* Used for npm search
		*/
		"keywords",
	],
};
