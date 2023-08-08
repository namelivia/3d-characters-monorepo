module.exports = {
  "*.{ts,tsx,js,jsx,mdx}": ["prettier --list-different --write", "eslint"],
  "package.json": "sort-package-json",
};
