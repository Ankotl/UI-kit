// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  rootDir: 'src',
  clearMocks: true,
  moduleNameMapper: {
    '.(css|less|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: 'src',
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
}
