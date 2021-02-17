module.exports = {
  root: true,
  env: {
    node: true,
  },
<<<<<<< Updated upstream
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
=======
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript/recommended'],
>>>>>>> Stashed changes
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
<<<<<<< Updated upstream
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
=======
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
>>>>>>> Stashed changes
