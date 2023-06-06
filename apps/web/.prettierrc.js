const baseConfig = require("../../.prettierrc.js");

/** @type {import("prettier").Options} */
const projectConfig = {
  plugins: ["prettier-plugin-svelte"],
  pluginSearchDirs: ["."],
  overrides: [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
};

const config = {
  ...baseConfig,
  ...projectConfig
};

export default config;
