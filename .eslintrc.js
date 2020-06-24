module.exports = {
    root: true,
    extends: [
        'plugin:vue/essential',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'prettier/@typescript-eslint',
        'prettier/babel',
        'prettier/flowtype',
        'prettier/react',
        'prettier/standard',
        'prettier/unicorn',
        'prettier/vue',
    ],
    plugins: [
        '@typescript-eslint',
        'babel',
        'flowtype',
        'react',
        'standard',
        'unicorn',
        'vue',
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        es6: true,
        node: true,
    },
}
