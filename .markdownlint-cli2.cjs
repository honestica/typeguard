const { printWidth } = require("./prettier.config.cjs");

module.exports = {
  ignores: ["CHANGELOG.md", "node_modules"],
  config: {
    default: true,
    line_length: {
      line_length: printWidth,
    },
    "no-inline-html": {
      allowed_elements: ["div", "br"],
    },
    "no-duplicate-header": false,
  },
};
