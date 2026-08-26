const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/**', 'docs/**', 'tmp-scaffold/**', 'node_modules/**', 'coverage/**'],
  },
  {
    rules: {
      // Reanimated shared values are mutated via `.value` by design.
      'react-hooks/immutability': 'off',
    },
  },
]);
