import { Config } from "jest";

const config: Config = {
  rootDir: "src",
  testEnvironment: "jest-environment-jsdom", // Ensure the test environment is set to jsdom
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/tests/**/*.test.tsx", "**/?(*.)+(spec|test).ts?(x)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "(.+)\\.js": "$1",
    "^@_types/(.*)$": "<rootDir>/types/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@store/(.*)$": "<rootDir>/store/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@styles/(.*)$": "<rootDir>/styles/$1",
    "^@pages/(.*)$": "<rootDir>/pages/$1",
    "^@views/(.*)$": "<rootDir>/views/$1",
    "^@mocks/(.*)$": "<rootDir>/mocks/$1",
    "^@utils/(.*)$": "<rootDir>/utils/$1",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".scss", ".css"],
};

export default config;
