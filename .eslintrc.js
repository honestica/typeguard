module.exports = {
	plugins: ["eslint-plugin-prefer-arrow"],
	overrides: [
		{
			/* ***************************************** */
			/* ****** Overrides for config files ******* */
			/* ***************************************** */

			files: ["./*.?(c)js"],
			rules: {
				"@typescript-eslint/no-var-requires": "off",
				"@typescript-eslint/prefer-optional-chain": "off",
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-require-imports": "off",
				"@typescript-eslint/explicit-function-return-type": "off",
				"@typescript-eslint/restrict-template-expressions": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/typedef": "off",
				"@typescript-eslint/no-magic-numbers": "off",
				"import/no-commonjs": "off",
				"arrow-body-style": "off",
				"max-lines": "off",
			},
		},
		{
			/* ***************************************** */
			/* ****** Overrides for spec files ******* */
			/* ***************************************** */
			files: ["./**/*.{spec,test}.ts"],
			rules: {
				"@typescript-eslint/no-magic-numbers": "off",
			},
		},
	],
	rules: {
		/* *********************************** */
		/* *** Overrides for eslint-config *** */
		/* *********************************** */

		"sonarjs/prefer-single-boolean-return": "off",

		/* ********************************* */
		/* *** Typescript specific rules *** */
		/* ********************************* */

		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/array-type": [
			"error",
			{
				default: "generic",
				readonly: "generic",
			},
		],
		"@typescript-eslint/await-thenable": "error",
		"@typescript-eslint/ban-ts-comment": [
			"error",
			{
				"ts-expect-error": "allow-with-description",
				"ts-ignore": false,
				"ts-check": true,
				"ts-nocheck": false,
				minimumDescriptionLength: 10,
			},
		],
		"@typescript-eslint/ban-tslint-comment": "error",
		"@typescript-eslint/ban-types": [
			"error",
			{
				types: {
					Boolean: {
						message: "Use boolean instead",
						fixWith: "boolean",
					},
					Number: {
						message: "Use number instead",
						fixWith: "number",
					},
					String: {
						message: "Use string instead",
						fixWith: "string",
					},
					Symbol: {
						message: "Use symbol instead",
						fixWith: "symbol",
					},
					Function: {
						message: "Use an arrow function instead, like `(value: unknown) => void`",
					},
					Object: {
						message: "Use a class, an interface, or a Record instead",
					},
					"{}": {
						message: "Use a class, an interface, or a Record instead",
					},
				},
			},
		],
		"@typescript-eslint/class-literal-property-style": ["error", "fields"], // readonly public field rather than constant getter
		"@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
		"@typescript-eslint/consistent-type-assertions": [
			"error",
			{
				assertionStyle: "as",
				objectLiteralTypeAssertions: "never",
			},
		],
		"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
		"@typescript-eslint/consistent-type-exports": [
			"error",
			{
				fixMixedExportsWithInlineTypeSpecifier: true,
			},
		],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				prefer: "type-imports",
				disallowTypeAnnotations: true,
			},
		],
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{
				allowExpressions: false,
				allowTypedFunctionExpressions: false,
				allowHigherOrderFunctions: false,
				allowDirectConstAssertionInArrowFunctions: false,
				allowConciseArrowFunctionExpressionsStartingWithVoid: false,
				allowedNames: [],
			},
		],
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				accessibility: "explicit",
				ignoredMethodNames: [],
				overrides: {
					accessors: "explicit",
					constructors: "explicit",
					methods: "explicit",
					properties: "explicit",
					parameterProperties: "explicit",
				},
			},
		],
		"@typescript-eslint/explicit-module-boundary-types": [
			"error",
			{
				allowArgumentsExplicitlyTypedAsAny: false,
				allowDirectConstAssertionInArrowFunctions: false,
				allowHigherOrderFunctions: false,
				allowTypedFunctionExpressions: false,
				allowedNames: [],
			},
		],
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				multilineDetection: "brackets",
				multiline: {
					delimiter: "semi",
					requireLast: true,
				},
				singleline: {
					delimiter: "semi",
					requireLast: false,
				},
			},
		],
		"@typescript-eslint/member-ordering": [
			"error",
			{
				default: {
					memberTypes: [
						// Signature
						"signature",
						// Field
						"public-abstract-field",
						"protected-abstract-field",
						"private-abstract-field",
						"public-static-field",
						"protected-static-field",
						"private-static-field",
						"public-instance-field",
						"protected-instance-field",
						"private-instance-field",
						"public-decorated-field",
						"protected-decorated-field",
						"private-decorated-field",
						"field",
						// Constructor
						"public-constructor",
						"protected-constructor",
						"private-constructor",
						"constructor",
						// Method
						"public-abstract-method",
						"protected-abstract-method",
						"private-abstract-method",
						"public-static-method",
						"protected-static-method",
						"private-static-method",
						"public-instance-method",
						"protected-instance-method",
						"private-instance-method",
						"public-decorated-method",
						"protected-decorated-method",
						"private-decorated-method",
						"method",
						// Get & Set
						["public-abstract-get", "public-abstract-set"],
						["protected-abstract-get", "protected-abstract-set"],
						["private-abstract-get", "private-abstract-set"],
						["public-static-get", "public-static-set"],
						["protected-static-get", "protected-static-set"],
						["private-static-get", "private-static-set"],
						["public-instance-get", "public-instance-set"],
						["protected-instance-get", "protected-instance-set"],
						["private-instance-get", "private-instance-set"],
						["public-decorated-get", "public-decorated-set"],
						["protected-decorated-get", "protected-decorated-set"],
						["private-decorated-get", "private-decorated-set"],
						["get", "set"],
					],
				},
			},
		],
		"@typescript-eslint/method-signature-style": ["error", "property"],
		"@typescript-eslint/naming-convention": [
			"off",
			[
				{
					selector: ["default"],
					format: "PascalCase",
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["variableLike"],
					format: "snake_case",
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["variable"],
					modifiers: ["const"],
					format: "UPPER_CASE",
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["memberLike"],
					format: "camelCase",
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["memberLike"],
					modifiers: ["static"],
					format: "PascalCase",
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["property"],
					modifiers: ["static", "readonly"],
					format: "UPPER_CASE",
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
			],
		],
		"@typescript-eslint/no-base-to-string": "error",
		"@typescript-eslint/no-confusing-non-null-assertion": "error",
		"@typescript-eslint/no-confusing-void-expression": [
			"error",
			{
				ignoreArrowShorthand: false,
				ignoreVoidOperator: false,
			},
		],
		"@typescript-eslint/no-dynamic-delete": "error",
		"@typescript-eslint/no-empty-interface": [
			"error",
			{
				allowSingleExtends: false,
			},
		],
		"@typescript-eslint/no-explicit-any": [
			"error",
			{
				fixToUnknown: true,
				ignoreRestArgs: false,
			},
		],
		"@typescript-eslint/no-extra-non-null-assertion": "error",
		"@typescript-eslint/no-extraneous-class": "off",
		"@typescript-eslint/no-floating-promises": [
			"error",
			{
				ignoreVoid: false,
				ignoreIIFE: false,
			},
		],
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-implicit-any-catch": [
			"error",
			{
				allowExplicitAny: false,
			},
		],
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-invalid-void-type": [
			"error",
			{
				allowInGenericTypeArguments: ["Promise"],
				allowAsThisParameter: false,
			},
		],
		"@typescript-eslint/no-meaningless-void-operator": [
			"error",
			{
				checkNever: true,
			},
		],
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksConditionals: true,
				checksVoidReturn: false,
			},
		],
		"@typescript-eslint/no-namespace": [
			"error",
			{
				allowDeclarations: false,
				allowDefinitionFiles: false,
			},
		],
		"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
		"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
		"@typescript-eslint/no-non-null-assertion": "error",
		"@typescript-eslint/no-parameter-properties": "error",
		"@typescript-eslint/no-require-imports": "error",
		"@typescript-eslint/no-this-alias": "error",
		// Failed lint. please review
		"@typescript-eslint/no-type-alias": [
			"off",
			{
				allowAliases: "never",
				allowCallbacks: "always",
				allowConditionalTypes: "never",
				allowConstructors: "never",
				allowLiterals: "never",
				allowMappedTypes: "never",
				allowTupleTypes: "never",
				allowGenerics: "never",
			},
		],
		"@typescript-eslint/no-unnecessary-boolean-literal-compare": [
			"error",
			{
				allowComparingNullableBooleansToTrue: false,
				allowComparingNullableBooleansToFalse: false,
			},
		],
		"@typescript-eslint/no-unnecessary-condition": [
			"error",
			{
				allowConstantLoopConditions: false,
				allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
			},
		],
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/no-unnecessary-type-arguments": "off",
		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-unnecessary-type-constraint": "off",
		"@typescript-eslint/no-unsafe-argument": "error",
		"@typescript-eslint/no-unsafe-assignment": "error",
		"@typescript-eslint/no-unsafe-call": "error",
		"@typescript-eslint/no-unsafe-member-access": "error",
		"@typescript-eslint/no-unsafe-return": "error",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/non-nullable-type-assertion-style": "error",
		"@typescript-eslint/prefer-as-const": "error",
		"@typescript-eslint/prefer-enum-initializers": "error",
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-includes": "error",
		"@typescript-eslint/prefer-literal-enum-member": [
			"error",
			{
				allowBitwiseExpressions: false,
			},
		],
		"@typescript-eslint/prefer-namespace-keyword": "off",
		"@typescript-eslint/prefer-nullish-coalescing": [
			"warn",
			{
				ignoreConditionalTests: false,
				ignoreMixedLogicalExpressions: false,
			},
		],
		"@typescript-eslint/prefer-optional-chain": "off",
		"@typescript-eslint/prefer-readonly": [
			"error",
			{
				onlyInlineLambdas: false,
			},
		],
		"@typescript-eslint/prefer-readonly-parameter-types": "off",
		"@typescript-eslint/prefer-reduce-type-parameter": "error",
		"@typescript-eslint/prefer-regexp-exec": "error",
		"@typescript-eslint/prefer-return-this-type": "error",
		"@typescript-eslint/prefer-string-starts-ends-with": "error",
		"@typescript-eslint/prefer-ts-expect-error": "off",
		"@typescript-eslint/promise-function-async": [
			"error",
			{
				allowAny: false,
				checkArrowFunctions: true,
				checkFunctionDeclarations: true,
				checkFunctionExpressions: true,
				checkMethodDeclarations: true,
			},
		],
		"@typescript-eslint/require-array-sort-compare": [
			"error",
			{
				ignoreStringArrays: false,
			},
		],
		"@typescript-eslint/restrict-plus-operands": [
			"error",
			{
				allowAny: false,
				checkCompoundAssignments: true,
			},
		],
		"@typescript-eslint/restrict-template-expressions": [
			"error",
			{
				allowAny: false,
				allowBoolean: false,
				allowNumber: false,
				allowNullish: false,
				allowRegExp: false,
			},
		],
		"@typescript-eslint/sort-type-union-intersection-members": [
			"error",
			{
				checkIntersections: true,
				checkUnions: true,
				groupOrder: [
					"named",
					"keyword",
					"operator",
					"literal",
					"function",
					"import",
					"conditional",
					"object",
					"tuple",
					"intersection",
					"union",
					"nullish",
				],
			},
		],
		"@typescript-eslint/strict-boolean-expressions": [
			"error",
			{
				allowAny: false,
				allowNumber: false,
				allowString: false,
				allowNullableBoolean: false,
				allowNullableNumber: false,
				allowNullableString: false,
				allowNullableObject: false,
				allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
			},
		],
		"@typescript-eslint/switch-exhaustiveness-check": "error",
		"@typescript-eslint/triple-slash-reference": "error",
		"@typescript-eslint/type-annotation-spacing": [
			"off",
			{
				before: false,
				after: true,
				overrides: {
					arrow: {
						before: true,
						after: true,
					},
				},
			},
		],
		"@typescript-eslint/typedef": [
			"error",
			{
				arrayDestructuring: true,
				arrowParameter: true,
				memberVariableDeclaration: true,
				objectDestructuring: true,
				parameter: true,
				propertyDeclaration: true,
				variableDeclaration: true,
				variableDeclarationIgnoreFunction: false,
			},
		],
		"@typescript-eslint/unbound-method": [
			"error",
			{
				ignoreStatic: false,
			},
		],
		"@typescript-eslint/unified-signatures": [
			"error",
			// {
			// 	"ignoreDifferentlyNamedParameters": false
			// }
		],

		/* ********************************** */
		/* *** Typescript overrides rules *** */
		/* ********************************** */

		"brace-style": "off",
		"@typescript-eslint/brace-style": [
			"off",
			"allman",
			{
				allowSingleLine: false,
			},
		],
		"comma-dangle": "off",
		"@typescript-eslint/comma-dangle": ["off", "always-multiline"],
		"comma-spacing": "off",
		"@typescript-eslint/comma-spacing": [
			"off",
			{
				before: false,
				after: true,
			},
		],
		"default-param-last": "off",
		"@typescript-eslint/default-param-last": "error",
		"dot-notation": "off",
		"@typescript-eslint/dot-notation": [
			"error",
			{
				allowKeywords: true,
				allowPrivateClassPropertyAccess: false,
				allowProtectedClassPropertyAccess: false,
				allowIndexSignaturePropertyAccess: true,
			},
		],
		"func-call-spacing": "off",
		"@typescript-eslint/func-call-spacing": ["off", "never"],
		indent: "off",
		"@typescript-eslint/indent": [
			"off",
			"tab",
			{
				flatTernaryExpressions: true,
				offsetTernaryExpressions: true,
				ignoreComments: true,
				ignoredNodes: [
					// https://ts-ast-viewer.com/
					"SwitchCase > BreakStatement", // ?
					"CaseClause > BreakStatement", // ?
					"ObjectExpression",
					"EnumDeclaration",
				],
				SwitchCase: 1,
				VariableDeclarator: 1,
				outerIIFEBody: 1,
				MemberExpression: 1,
				FunctionDeclaration: {
					parameters: 1,
					body: 1,
				},
				FunctionExpression: {
					parameters: 1,
					body: 1,
				},
				StaticBlock: {
					body: 1,
				},
				CallExpression: {
					arguments: 1,
				},
				ArrayExpression: 1,
				ObjectExpression: 1,
				ImportDeclaration: 1,
			},
		],
		"init-declarations": "off",
		"@typescript-eslint/init-declarations": ["error", "always"],
		"keyword-spacing": "off",
		"@typescript-eslint/keyword-spacing": [
			"off",
			{
				before: true,
				after: true,
			},
		],
		"lines-between-class-members": "off",
		"@typescript-eslint/lines-between-class-members": [
			"off",
			"always",
			{
				exceptAfterOverload: true,
				exceptAfterSingleLine: true,
			},
		],
		"no-array-constructor": "off",
		"@typescript-eslint/no-array-constructor": "error",
		"no-dupe-class-members": "off",
		"@typescript-eslint/no-dupe-class-members": "error",
		"no-duplicate-imports": "off",
		"@typescript-eslint/no-duplicate-imports": "error",
		"no-empty-function": "off",
		"@typescript-eslint/no-empty-function": "error",
		"no-extra-parens": "off",
		"@typescript-eslint/no-extra-parens": "off",
		"no-extra-semi": "off",
		"@typescript-eslint/no-extra-semi": "error",
		"no-implied-eval": "off",
		"@typescript-eslint/no-implied-eval": "error",
		"no-invalid-this": "off",
		"@typescript-eslint/no-invalid-this": [
			"error",
			{
				capIsConstructor: false,
			},
		],
		"no-loop-func": "off",
		"@typescript-eslint/no-loop-func": "error",
		"no-loss-of-precision": "off",
		"@typescript-eslint/no-loss-of-precision": "error",
		"no-magic-numbers": "off",
		"@typescript-eslint/no-magic-numbers": [
			"error",
			{
				ignore: [0, 1],
				enforceConst: true,
				detectObjects: true,
				ignoreArrayIndexes: false,
				ignoreDefaultValues: false,
				ignoreEnums: true,
				ignoreNumericLiteralTypes: false,
				ignoreReadonlyClassProperties: false,
			},
		],
		"no-redeclare": "off",
		"@typescript-eslint/no-redeclare": [
			"error",
			{
				builtinGlobals: true,
				ignoreDeclarationMerge: true,
			},
		],
		"no-restricted-imports": "off",
		"@typescript-eslint/no-restricted-imports": "off",
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": [
			"error",
			{
				builtinGlobals: true,
				hoist: "all",
				ignoreOnInitialization: false,
				ignoreTypeValueShadow: false,
				ignoreFunctionTypeParameterNameValueShadow: false,
				allow: [],
			},
		],
		"no-throw-literal": "off",
		"@typescript-eslint/no-throw-literal": [
			"error",
			{
				allowThrowingAny: false,
				allowThrowingUnknown: false,
			},
		],
		"no-unused-expressions": "off",
		"@typescript-eslint/no-unused-expressions": [
			"error",
			{
				enforceForJSX: true,
				allowTernary: false,
				allowShortCircuit: false,
				allowTaggedTemplates: false,
			},
		],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				vars: "all",
				args: "all",
				ignoreRestSiblings: false,
				caughtErrors: "all",
			},
		],
		"no-use-before-define": "off",
		"@typescript-eslint/no-use-before-define": [
			"error",
			{
				variables: true,
				functions: true,
				classes: true,
				enums: true,
				typedefs: true,
				ignoreTypeReferences: false,
			},
		],
		"no-useless-constructor": "off",
		"@typescript-eslint/no-useless-constructor": "error",
		"object-curly-spacing": "off",
		"@typescript-eslint/object-curly-spacing": [
			"off",
			"always",
			{
				arraysInObjects: false,
				objectsInObjects: false,
			},
		],
		"padding-line-between-statements": "off",
		"@typescript-eslint/padding-line-between-statements": [
			"off",
			{
				blankLine: "any",
				prev: "*",
				next: "*",
			},
			{
				blankLine: "always",
				prev: "*",
				next: [
					"type",
					"interface",
					"class",
					"function",
					"return",
					"throw",
					"try",
					"switch",
					"case",
					"default",
					"if",
					"do",
					"while",
					"block",
					"multiline-expression",
					"require",
					"exports",
					"import",
					"export",
				],
			},
			{
				blankLine: "always",
				prev: [
					"type",
					"interface",
					"class",
					"function",
					"switch",
					"block",
					"block-like",
					"multiline-expression",
					"require",
					"exports",
					"import",
					"export",
				],
				next: "*",
			},
			{
				blankLine: "never",
				prev: ["if", "for", "do", "while"],
				next: "block-like",
			},
			{
				blankLine: "any",
				prev: ["exports", "export"],
				next: ["exports", "export"],
			},
			{
				blankLine: "any",
				prev: ["require", "import"],
				next: ["require", "import"],
			},
		],
		quotes: "off",
		"@typescript-eslint/quotes": [
			"off",
			"double",
			{
				avoidEscape: true,
				allowTemplateLiterals: false,
			},
		],
		"require-await": "off",
		"@typescript-eslint/require-await": "error",
		"no-return-await": "off",
		"@typescript-eslint/return-await": ["error", "always"],
		semi: "off",
		"@typescript-eslint/semi": [
			"error",
			"always",
			{
				omitLastInOneLineBlock: false,
			},
		],
		"space-before-function-paren": "off",
		"@typescript-eslint/space-before-function-paren": [
			"off",
			{
				named: "never",
				anonymous: "always",
				asyncArrow: "always",
			},
		],
		"space-infix-ops": "off",
		"@typescript-eslint/space-infix-ops": [
			"off",
			{
				int32Hint: false,
			},
		],

		/* ************************ */
		/* *** Javascript rules *** */
		/* ************************ */

		"accessor-pairs": [
			"warn",
			{
				setWithoutGet: true,
				getWithoutSet: true,
				enforceForClassMembers: true,
			},
		],
		"array-bracket-newline": ["off", "consistent"],
		"array-bracket-spacing": [
			"off",
			"never",
			{
				singleValue: false,
				objectsInArrays: false,
				arraysInArrays: false,
			},
		],
		"array-callback-return": [
			"error",
			{
				allowImplicit: false,
				checkForEach: true,
			},
		],
		"array-element-newline": [
			"off",
			{
				multiline: true,
				minItems: null,
			},
		],
		"arrow-body-style": ["error", "always"],
		"arrow-parens": ["error", "always"],
		"arrow-spacing": [
			"off",
			{
				before: true,
				after: true,
			},
		],
		"block-scoped-var": "error",
		"block-spacing": ["off", "always"],
		"class-methods-use-this": [
			"error",
			{
				enforceForClassFields: true,
			},
		],
		camelcase: "off", // handled by naming-convention
		"capitalized-comments": "off",
		"comma-style": ["off", "last"],

		complexity: ["error", 30],
		"computed-property-spacing": ["off", "never"],
		"consistent-return": [
			"error",
			{
				treatUndefinedAsUnspecified: false,
			},
		],
		"consistent-this": "off",
		"constructor-super": "error",
		curly: ["error", "all"],
		"default-case": "error",
		"default-case-last": "error",
		"dot-location": ["error", "property"],
		"eol-last": ["error", "always"],
		eqeqeq: [
			"error",
			"always",
			{
				null: "ignore",
			},
		],
		"for-direction": "error",
		"func-name-matching": "off",
		"func-names": [
			"error",
			"never",
			{
				generators: "never",
			},
		],
		"func-style": [
			"error",
			"declaration",
			{
				allowArrowFunctions: true,
			},
		],
		"function-call-argument-newline": ["off", "consistent"],
		"function-paren-newline": ["off", "multiline-arguments"],
		"generator-star-spacing": [
			"off",
			{
				named: {
					before: false,
					after: true,
				},
				anonymous: {
					before: false,
					after: false,
				},
				method: {
					before: true,
					after: true,
				},
			},
		],
		"getter-return": [
			"error",
			{
				allowImplicit: false,
			},
		],
		"grouped-accessor-pairs": ["error", "getBeforeSet"],
		"guard-for-in": "error",
		"id-denylist": ["error", "e", "ev", "err", "ex", "v", "val", "cb", "fn", "fun", "func", "o", "obj"],
		"id-length": [
			"error",
			{
				min: 1,
				max: 100,
			},
		],
		"id-match": "off", // Handled by naming convention
		"implicit-arrow-linebreak": ["off", "beside"],
		"jsx-quotes": ["off", "prefer-double"],
		"key-spacing": [
			"off",
			{
				beforeColon: false,
				afterColon: true,
				mode: "strict",
			},
		],
		"line-comment-position": ["off", "above"],
		"linebreak-style": ["error", "unix"],
		"lines-around-comment": "off",
		"max-classes-per-file": [
			"error",
			1,
			// {
			// 	"ignoreExpressions": false
			// }
		],
		"max-depth": ["error", 7],
		"max-len": [
			"error",
			{
				code: 200,
				tabWidth: 4,
				comments: 300, // This is necessary to enable all kinds of comment formatting in VSCode. Do not lower.
				ignoreComments: false,
				ignoreTrailingComments: false,
				ignoreUrls: false,
				ignoreStrings: true,
				ignoreRegExpLiterals: false,
				ignoreTemplateLiterals: true,
			},
		],
		"max-lines": [
			"error",
			{
				max: 1000,
				skipBlankLines: true,
				skipComments: true,
			},
		],
		"max-lines-per-function": [
			"error",
			{
				max: 100,
				skipBlankLines: true,
				skipComments: true,
				IIFEs: true,
			},
		],
		"max-nested-callbacks": ["error", 4],
		"max-params": ["error", 4],
		"max-statements": [
			"error",
			50,
			{
				ignoreTopLevelFunctions: false,
			},
		],
		"max-statements-per-line": [
			"error",
			{
				max: 1,
			},
		],
		"multiline-comment-style": "off",
		"new-cap": "off",
		"new-parens": ["error", "always"],
		"no-alert": "off",
		"no-async-promise-executor": "error",
		"no-await-in-loop": "off",
		"no-bitwise": "off",
		"no-caller": "error",
		"no-case-declarations": "error",
		"no-class-assign": "error",
		"no-compare-neg-zero": "error",
		"no-cond-assign": ["error", "always"],
		"no-confusing-arrow": [
			"error",
			{
				allowParens: true,
				onlyOneSimpleParam: true,
			},
		],
		"no-console": [
			"error",
			{
				allow: ["warn", "error"],
			},
		],
		"no-const-assign": "error",
		"no-constant-condition": [
			"error",
			{
				checkLoops: true,
			},
		],
		"no-constructor-return": "error",
		"no-continue": "off",
		"no-control-regex": "off",
		"no-debugger": "off",
		"no-delete-var": "error",
		"no-div-regex": "off",
		"no-dupe-args": "error",
		"no-dupe-else-if": "error",
		"no-dupe-keys": "error",
		"no-duplicate-case": "error",
		"no-else-return": "error",
		"no-empty": [
			"error",
			{
				allowEmptyCatch: false,
			},
		],
		"no-empty-character-class": "error",
		"no-empty-pattern": "error",
		"no-eq-null": "error",
		"no-eval": [
			"error",
			{
				allowIndirect: false,
			},
		],
		"no-ex-assign": "error",
		"no-extend-native": "warn",
		"no-extra-bind": "error",
		"no-extra-boolean-cast": [
			"error",
			{
				enforceForLogicalOperands: true,
			},
		],
		"no-extra-label": "off",
		"no-fallthrough": [
			"error",
			{
				commentPattern: "no break",
			},
		],
		"no-floating-decimal": "error",
		"no-func-assign": "error",
		"no-global-assign": "error",
		"no-implicit-coercion": [
			"error",
			{
				boolean: true,
				number: true,
				string: true,
				disallowTemplateShorthand: true,
			},
		],
		"no-implicit-globals": [
			"error",
			{
				lexicalBindings: true,
			},
		],
		"no-import-assign": "error",
		"no-inline-comments": "off",
		"no-inner-declarations": "off",
		"no-invalid-regexp": [
			"error",
			{
				allowConstructorFlags: ["g", "i", "m", "u", "y", "s"],
			},
		],
		"no-irregular-whitespace": [
			"error",
			{
				skipStrings: false,
				skipComments: false,
				skipRegExps: false,
				skipTemplates: false,
			},
		],
		"no-iterator": "error",
		"no-label-var": "error",
		"no-labels": [
			"error",
			{
				allowLoop: false,
				allowSwitch: false,
			},
		],
		"no-lone-blocks": "error",
		"no-lonely-if": "warn",
		"no-misleading-character-class": "error",
		"no-mixed-operators": "off",
		"no-mixed-spaces-and-tabs": "error",
		"no-multi-assign": [
			"error",
			{
				ignoreNonDeclaration: false,
			},
		],
		"no-multi-spaces": [
			"off",
			{
				ignoreEOLComments: false,
			},
		],
		"no-multi-str": "error",
		"no-multiple-empty-lines": [
			"off",
			{
				max: 1,
				maxEOF: 1,
				maxBOF: 0,
			},
		],
		"no-negated-condition": "error",
		"no-nested-ternary": "error",
		"no-new": "error",
		"no-new-func": "error",
		"no-new-object": "error",
		"no-new-symbol": "error",
		"no-new-wrappers": "error",
		"no-nonoctal-decimal-escape": "error",
		"no-obj-calls": "error",
		"no-octal": "error",
		"no-octal-escape": "error",
		"no-param-reassign": [
			"error",
			{
				props: false,
			},
		],
		"no-plusplus": "off" /* See space-unary-ops */,
		"no-promise-executor-return": "error",
		"no-proto": "error",
		"no-prototype-builtins": "off",
		"no-regex-spaces": "error",
		"no-restricted-exports": "off",
		"no-restricted-globals": "off",
		"no-restricted-properties": "off",
		"no-restricted-syntax": [
			"error",
			{
				selector: "CallExpression[callee.type=FunctionExpression]",
				message: "IIFEs are not allowed.",
			},
			{
				selector: "CallExpression[callee.type=ArrowFunctionExpression]",
				message: "IIFEs are not allowed.",
			},
			{
				selector: "MethodDefinition[kind=get]",
				message: "Create a proper getter method.",
			},
			{
				selector: "MethodDefinition[kind=set]",
				message: "Create a proper setter method.",
			},
		],
		"no-return-assign": ["error", "always"],
		"no-script-url": "error",
		"no-self-assign": [
			"error",
			{
				props: true,
			},
		],
		"no-self-compare": "error",
		"no-sequences": [
			"error",
			{
				allowInParentheses: false,
			},
		],
		"no-setter-return": "error",
		"no-shadow-restricted-names": "error",
		"no-sparse-arrays": "error",
		"no-tabs": [
			"off",
			{
				allowIndentationTabs: true,
			},
		],
		"no-template-curly-in-string": "error",
		"no-ternary": "off",
		"no-this-before-super": "error",
		"no-trailing-spaces": [
			"off",
			{
				skipBlankLines: false,
				ignoreComments: false,
			},
		],
		// already handle by typescript
		// "no-undef": "off",
		"no-undef-init": "error",
		"no-undefined": "off",
		"no-underscore-dangle": [
			"off",
			{
				allowAfterThis: false,
				allowAfterSuper: false,
				allowAfterThisConstructor: false,
				enforceInMethodNames: false,
				allowFunctionParams: false,
			},
		],
		"no-unexpected-multiline": "error",
		"no-unmodified-loop-condition": "error",
		"no-unneeded-ternary": [
			"error",
			{
				defaultAssignment: false,
			},
		],
		"no-unreachable": "error",
		"no-unreachable-loop": "error",
		"no-unsafe-finally": "error",
		"no-unsafe-negation": "error",
		"no-unsafe-optional-chaining": [
			"error",
			{
				disallowArithmeticOperators: true,
			},
		],
		"no-unused-labels": "error",
		"no-unused-private-class-members": "error",
		"no-useless-backreference": "error",
		"no-useless-call": "error",
		"no-useless-catch": "error",
		"no-useless-computed-key": [
			"error",
			{
				enforceForClassMembers: true,
			},
		],
		"no-useless-concat": "error",
		"no-useless-escape": "error",
		"no-useless-rename": [
			"error",
			{
				ignoreDestructuring: false,
				ignoreImport: false,
				ignoreExport: false,
			},
		],
		"no-useless-return": "error",
		"no-var": "error",
		"no-void": [
			"error",
			{
				allowAsStatement: false,
			},
		],
		"no-warning-comments": [
			"warn",
			{
				terms: ["TODO", "FIXME"],
				location: "anywhere",
			},
		],
		"no-whitespace-before-property": "error",
		"no-with": "error",
		"nonblock-statement-body-position": ["error", "beside"],
		"object-curly-newline": [
			"off",
			{
				ObjectExpression: { consistent: true, multiline: true },
				ObjectPattern: { consistent: true, multiline: true },
				ImportDeclaration: { consistent: true, multiline: true },
				ExportDeclaration: { consistent: true, multiline: true },
			},
		],
		"object-property-newline": [
			"off",
			{
				allowAllPropertiesOnSameLine: true,
			},
		],
		"object-shorthand": ["error", "never"],
		"one-var": ["error", "never"],
		"one-var-declaration-per-line": ["error", "always"],
		"operator-assignment": "off",
		"operator-linebreak": ["off", "before"],
		"padded-blocks": ["off", "never"],
		"prefer-arrow-callback": [
			"error",
			{
				allowNamedFunctions: false,
				allowUnboundThis: false,
			},
		],
		"prefer-const": [
			"error",
			{
				destructuring: "any",
				ignoreReadBeforeAssign: true,
			},
		],
		"prefer-destructuring": "off",
		"prefer-exponentiation-operator": "off",
		"prefer-named-capture-group": "warn",
		"prefer-numeric-literals": "error",
		"prefer-object-has-own": "error",
		"prefer-object-spread": "error",
		"prefer-promise-reject-errors": [
			"error",
			{
				allowEmptyReject: false,
			},
		],
		"prefer-regex-literals": [
			"error",
			{
				disallowRedundantWrapping: true,
			},
		],
		"prefer-rest-params": "error",
		"prefer-spread": "error",
		"prefer-template": "error",
		"quote-props": ["error", "as-needed"],
		radix: ["error", "always"],
		"require-atomic-updates": [
			"error",
			{
				allowProperties: false,
			},
		],
		"require-unicode-regexp": "off",
		"require-yield": "error",
		"rest-spread-spacing": ["off", "never"],
		"semi-spacing": [
			"off",
			{
				before: false,
				after: true,
			},
		],
		"semi-style": ["off", "last"],
		"sort-imports": "off",
		"sort-keys": "off",
		"sort-vars": "off",
		"space-before-blocks": ["off", "always"],
		"space-in-parens": ["off", "never"],
		"space-unary-ops": [
			"off",
			{
				words: true,
				nonwords: false,
			},
		],
		"spaced-comment": [
			"off",
			"always",
			{
				line: {
					markers: ["/"],
					exceptions: ["-", "="],
				},
				block: {
					markers: ["*"],
					exceptions: ["*"],
					balanced: true,
				},
			},
		],
		strict: ["error", "never"],
		"switch-colon-spacing": [
			"off",
			{
				before: false,
				after: true,
			},
		],
		"symbol-description": "error",
		"template-curly-spacing": ["off", "never"],
		"template-tag-spacing": ["off", "always"],
		"unicode-bom": ["error", "never"],
		"use-isnan": [
			"error",
			{
				enforceForSwitchCase: true,
				enforceForIndexOf: true,
			},
		],
		"valid-typeof": [
			"error",
			{
				requireStringLiterals: true,
			},
		],
		"vars-on-top": "error",
		"wrap-iife": [
			"error",
			"inside",
			{
				functionPrototypeMethods: true,
			},
		],
		"wrap-regex": "off",
		"yield-star-spacing": [
			"off",
			{
				before: false,
				after: true,
			},
		],
		yoda: [
			"off",
			"never",
			{
				onlyEquality: false,
				exceptRange: true,
			},
		],

		/* ********************* */
		/* *** Other plugins *** */
		/* ********************* */

		"prefer-arrow/prefer-arrow-functions": [
			"error",
			{
				disallowPrototype: true,
				singleReturnOnly: true,
				classPropertiesAllowed: false,
				allowStandaloneDeclarations: true,
			},
		],
		"import/default": "off",
		"import/dynamic-import-chunkname": "off",
		"import/export": "off",
		"import/exports-last": "error",
		// disabled please review
		"import/extensions": ["off", "always"],
		"import/first": "error",
		"import/group-exports": "error",
		"import/max-dependencies": "off",
		"import/named": "off",
		"import/namespace": "off",
		"import/newline-after-import": "off",
		"import/no-absolute-path": "off",
		"import/no-amd": "error",
		"import/no-anonymous-default-export": "off",
		"import/no-commonjs": "error",
		"import/no-cycle": "off",
		"import/no-default-export": "error",
		"import/no-deprecated": "error",
		"import/no-duplicates": "error",
		"import/no-dynamic-require": "off",
		"import/no-extraneous-dependencies": "error",
		"import/no-import-module-exports": "off",
		"import/no-internal-modules": "off",
		"import/no-mutable-exports": "error",
		"import/no-named-as-default-member": "off",
		"import/no-named-as-default": "off",
		"import/no-named-default": "off",
		"import/no-named-export": "off",
		"import/no-namespace": "off",
		"import/no-nodejs-modules": "off",
		"import/no-relative-packages": "off",
		"import/no-relative-parent-imports": "off",
		"import/no-restricted-paths": "off",
		"import/no-unassigned-import": "error",
		"import/no-unresolved": "off",
		"import/no-unused-modules": "off",
		"import/no-useless-path-segments": "off",
		"import/no-webpack-loader-syntax": "off",
		"import/prefer-default-export": "off",
		"import/unambiguous": "off",
	},
};
