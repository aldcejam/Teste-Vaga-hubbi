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
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@dtos/(.*)$': '<rootDir>/src/dtos/$1',
        '^@infra/(.*)$': '<rootDir>/src/infra/$1',
        '^@useCases/(.*)$': '<rootDir>/src/useCases/$1',
        '^@errors/(.*)$': '<rootDir>/src/infra/http/errors/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/test/config/singleton.ts'],

}
  