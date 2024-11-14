import { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-environment-jsdom", // Ensure the test environment is set to jsdom
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  testMatch: ["**/tests/**/*.test.tsx", "**/?(*.)+(spec|test).ts?(x)"],
  moduleNameMapper: {
    "\\.scss$": "jest-transform-stub", // Mock SCSS imports
    "(.+)\\.js": "$1",
    "^@_types/(.*)$": "<rootDir>/src/types/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".scss"],
};

export default config;
