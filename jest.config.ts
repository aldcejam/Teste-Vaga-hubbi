module.exports = {
    
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    coverageDirectory: "../coverage",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
        "**/*.(t|j)s"
    ],
    moduleNameMapper: {
        '^@test/(.*)$': '<rootDir>/test/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/test/config/singleton.ts'],

}
  