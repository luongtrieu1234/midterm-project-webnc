module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],

  overrides: [
    {
      env: {
        node: true,
        browser: true,
        es6: true,
      },
      files: ['.eslintrc.{js,cjs,jsx}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  globals: {
    process: 'readonly',
  },
  rules: {
    indent: ['error', 2],
    // "linebreak-style": ["error", "unix"],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'function-paren-newline': 0,
    'comma-dangle': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'react/no-unescaped-entities': 0,
  },
};
