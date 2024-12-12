import { v4 as uuidv4 } from "uuid";

export function handleUploadImage(
  e: React.ChangeEvent<HTMLInputElement>
): Promise<string> {
  return new Promise((resolve, reject) => {
    const file = e.target.files?.[0];
    console.log(file);
    const MAX_SIZE = 8 * 1024 * 1024;
    const allowedFormats = ["image/jpeg", "image/png"];

    if (file) {
      if (file.size > MAX_SIZE) {
        // alert("Image max size is 8 MB");
        reject("File size exceeds limit");
        return;
      }

      if (!allowedFormats.includes(file.type)) {
        // alert("format is wrong");
        reject("Unsupported file format");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onabort = () => {
        reject("Operation was aborted");
      };

      reader.onerror = () => {
        reject("Error reading file");
      };

      reader.readAsDataURL(file);
    } else {
      reject("No file selected");
    }
  });
}
