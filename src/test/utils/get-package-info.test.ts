import { assert, describe, test, vi } from "vitest";
import { getPackageInfo } from "../../utils/get-package-info.js";

vi.mock("path", () => {
  return {
    default: {
      resolve: (filename: string) => `the/path/${filename}`,
    },
  };
});
vi.mock("fs", () => {
  return {
    promises: {
      readFile: (_filename: string, _encoding: string): Promise<string> =>
        Promise.resolve('{"version": "x.x.x", "name": "test-mock"}'),
    },
  };
});

describe("Get package info works as expected", {}, async () => {
  test("extracts the correct data", async () => {
    const packageInfo = await getPackageInfo();

    assert.deepStrictEqual("x.x.x", packageInfo.version);
    assert.deepStrictEqual("test-mock", packageInfo.name);
  });
});
