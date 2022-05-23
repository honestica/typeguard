module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '\\.[jt]s$': 'ts-jest',
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
      useESM: true,
    },
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        ancestorSeparator: ' › ',
        classNameTemplate: '{classname}',
        outputDirectory: './reports/junit',
        outputName: 'lifen-typeguard-jest-junit.xml',
        suiteName: 'jest typeguard tests',
        titleTemplate: '{title}',
        uniqueOutputName: 'false',
        usePathForSuiteName: 'true',
      },
    ],
  ],
  coverageReporters: ['text', 'lcov', 'json'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: '<rootDir>/reports/jest',
  coverageThreshold: {
    global: {
      statements: 75,
    },
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.{spec,test}.ts', '<rootDir>__tests__/**/*.{spec,test}.ts'],
  displayName: {
    name: 'typeguard',
    color: 'blue',
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '(.+)\\.[jt]s': '$1',
  },
};
