import { readFormData, H3Event } from "h3";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

export default defineEventHandler(async (event: H3Event) => {
  const formData = await readFormData(event);

  if (!formData) {
    return { error: "No file uploaded" };
  }

  const file = formData.get("file") as File;

  if (file.size === 0 || file.name.trim().length === 0) {
    return { error: "Non file on the request" };
  }

  if (
    !["image/png", "image/jpeg", "image/x-icon", "iamge/gif"].includes(
      file.type,
    )
  ) {
    return { error: "File type not supported" };
  }

  if (file.size > 5242880) {
    return { error: "The file is too large" };
  }

  const imageUploadedCode = crypto
    .randomUUID()
    .replaceAll("-", "")
    .slice(24, 32);
  const uploadDir = path.join(process.cwd(), "/tmp/uploads");
  const filePath = path.join(
    uploadDir,
    `${file.name.split(".")[0]}-${imageUploadedCode}.${file.type.split("/")[1]}`,
  );
  const _outputDir = path.join(
    process.cwd(),
    `/tmp/output/output-${imageUploadedCode}`,
  );

  await fs.mkdir(_outputDir, { recursive: true });
  await fs.mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(filePath, buffer);

  const sizeAndNames = [
    [16, "favicon.ico"],
    [16, "favicon.png"],
    [16, "favicon-32x32.png"],
    [32, "favicon-16x16.png"],
    [48, "favicon-48x48.png"],
    [64, "favicon-64x64.png"],
    [128, "favicon-128x128.png"],
    [180, "apple-touch-icon-180x180.png"],
    [192, "android-chrome-192x192.png"],
    [512, "android-chrome-512x512.png"],
  ];

  sizeAndNames.map(async ([size, name]) => {
    await sharp(filePath)
      .resize(size as number)
      .toFile(`${_outputDir}/`.concat(name as string));
  });

  return { code: imageUploadedCode };
});
