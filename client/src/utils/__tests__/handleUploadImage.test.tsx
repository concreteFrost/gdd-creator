import { handleUploadImage } from "@utils/images/handleUploadImage";
import React from "react";

describe("handleUploadImage", () => {
  const createFile = (size: number, type: string) => {
    return new File(["x".repeat(size)], "test", { type });
  };
  it("should reject image if size is greater then 8mb", async () => {
    const file = createFile(8 * 1024 * 1024 + 2, "image/png");
    const event = { target: { files: [file] } } as React.ChangeEvent<any>;
    expect(handleUploadImage(event)).rejects.toBe("File size exceeds limit");
  });
  it("should reject file with wrong format", async () => {
    const file = createFile(8 * 1024 * 1024, "image/svg");
    const event = { target: { files: [file] } } as React.ChangeEvent<any>;
    expect(handleUploadImage(event)).rejects.toBe("Unsupported file format");
  });
  it("should resolve file with size under 8mb", () => {
    const file = createFile(8 * 1024 * 1024, "image/png");
    const event = { target: { files: [file] } } as React.ChangeEvent<any>;
    expect(handleUploadImage(event)).resolves.toBeDefined();
  });
});
