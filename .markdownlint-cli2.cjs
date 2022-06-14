module.exports = {
	ignores: ["CHANGELOG.md", "node_modules"],
	config: {
		default: true,
		line_length: {
			line_length: 120,
		},
		"no-inline-html": {
			allowed_elements: ["div", "br"],
		},
		"no-duplicate-header": false,
		MD010: {
			code_blocks: false
		}
	},
};
