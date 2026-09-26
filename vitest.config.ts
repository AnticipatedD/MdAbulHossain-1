import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      'src/**/tests/*.ts',
      'src/**/*.test.ts'
    ],
    coverage: {
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 50,
        statements: 50
      }
    }
  }
});
