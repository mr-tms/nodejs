module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'eol-last': ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'error', 'info', 'group'] }],
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }]
  }
};