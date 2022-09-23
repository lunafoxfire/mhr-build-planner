const ERROR = 2;
const OFF = 0;

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json', './scripts/tsconfig.json'],
  },
  plugins: [
    'react',
  ],
  ignorePatterns: ['vite.config.ts'],
  rules: {
    'semi': [ERROR, 'always'],
    'comma-dangle': OFF,
    'quote-props': OFF,
    'no-multiple-empty-lines': OFF,
    'no-empty-pattern': OFF,
    'operator-linebreak': [ERROR, 'before'],
    'react/no-unknown-property': OFF, // handled by typescript
    'react/prop-types': OFF, // handled by typescript
    '@typescript-eslint/semi': [ERROR, 'always'],
    '@typescript-eslint/comma-dangle': [ERROR, 'always-multiline'],
    '@typescript-eslint/naming-convention': OFF,
    '@typescript-eslint/space-before-function-paren': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/consistent-type-definitions': OFF,
    '@typescript-eslint/member-delimiter-style': [ERROR, {
      multiline: { delimiter: 'comma', requireLast: true },
      singleline: { delimiter: 'comma', requireLast: false },
    }],
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/strict-boolean-expressions': OFF,
    '@typescript-eslint/prefer-nullish-coalescing': OFF,
    '@typescript-eslint/restrict-template-expressions': OFF,
    '@typescript-eslint/no-non-null-assertion': OFF,
  },
};
