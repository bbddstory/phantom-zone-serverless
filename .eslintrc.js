module.exports = {
    'env': {
        'browser': true,
        'jest': true,
    },
    'parser': 'babel-eslint',
    'extends': 'airbnb',
    'parserOptions': {
        'ecmaVersion': 5,
    },
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["src"],
            }
        }
    },
    'rules': {
        'indent': 2,
        'linebreak-style': [
            'error',
            'windows',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'react/prefer-stateless-function': [0],
        'react/jsx-filename-extension': [
            1, {
                'extensions': ['.js', '.jsx'],
            }],
        'react/forbid-prop-types': 0,
        'object-curly-newline': [
            'error',
            {
                'ImportDeclaration': 'never',
            }
        ],
        'react/jsx-one-expression-per-line': 'never',
        'max-len': [
          'error', {
            'code': 150,
          }
        ],
        'no-console': 'off',
    }
}
