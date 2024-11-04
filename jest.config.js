module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["lib/**/*.js", "bin/**/*.js", "!**/node_modules/**"],
  testMatch: ["**/tests/**/*.test.js"],
  verbose: true,
};
