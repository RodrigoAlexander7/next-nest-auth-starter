// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Ignored patterns: exclude compiled/generated files and node_modules
    ignores: ['test/**','eslint.config.mjs', 'dist/**', 'dist/generated/**', 'generated/**', 'node_modules/**', '**/*.spec.ts'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // Formatting handled by Prettier; keep it enabled but configure severity
      'prettier/prettier': 'error',
      quotes: 'off',
      'quote-props': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Relax strict type-aware rules to warnings to reduce friction for students
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
    },
  },
);
