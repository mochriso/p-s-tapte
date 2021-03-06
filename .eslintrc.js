// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // custom allowances
    'no-trailing-spaces': 'off',
    'indent': 'off',
    'no-restricted-syntax': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'quotes': 'off',
    'prefer-template': 'off',
    'no-unused-vars': 'off',
    'eqeqeq': 'off',
    'brace-style': 'off',
    'import/prefer-default-export': 'off',
    'prefer-arrow-callback': 'off',
    'no-useless-concat': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-duplicates': 'off',
    'arrow-body-style': 'off',
    'no-prototype-builtins': 'off',
    'no-param-reassign': ["error", { "props": true, "ignorePropertyModificationsFor": ["el"] }]
  }
}
