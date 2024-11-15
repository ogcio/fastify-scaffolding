import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: "default",
    coverage: {
      reporter: ["text"],
      provider: "istanbul",
    },

    include: [
      "./dist/@(test?(s)|__test?(s)__)/**/*.test.@(js|cjs|mjs|tap|cts|jsx|mts|ts|tsx)",
    ],
    exclude: ["./dist/**/@(fixture*(s)|dist|node_modules)/**"],
    maxConcurrency: 1,
    testTimeout: 30000, // Timeout in milliseconds (30 seconds)
  },
});
