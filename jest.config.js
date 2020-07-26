module.exports = {
	coverageProvider: 'v8',
	displayName: 'unit test',
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRunner: 'jest-circus/runner',
	testMatch: ['<rootDir>/tests/**/*.test.ts'],
	moduleNameMapper: {
		'^@utils/(.*)$': '<rootDir>/src/lib/util/$1',
		'^@lib/(.*)$': '<rootDir>/src/lib/$1',
		'^@root/(.*)$': '<rootDir>/src/$1'
	},
	globals: {
		'ts-jest': {
			tsConfig: '<rootDir>/tests/tsconfig.json'
		}
	}
};
