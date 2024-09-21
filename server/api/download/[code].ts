import archiver from "archiver";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, "code");
  const folderPath = path.resolve(process.cwd(), `tmp/output/output-${code}`);
  const zipFilePath = path.resolve(process.cwd(), "tmp/zip", "favicon.zip");

  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.pipe(output);
  archive.directory(folderPath, false);

  await new Promise((resolve, reject) => {
    archive.on("error", reject);
    output.on("close", resolve);
    archive.finalize();
  });

  setHeader(event, "Content-Type", "application/zip");
  setHeader(event, "Content-Disposition", 'attachment; filename="favicon.zip"');

  const stream = fs.createReadStream(zipFilePath);
  await sendStream(event, stream);

  stream.on("close", () => {
    fs.unlink(zipFilePath, (err) => {
      if (err) {
        console.error("Erro ao excluir o arquivo zip:", err);
      } else {
        console.log("Arquivo zip excluído com sucesso");
      }
    });

    fs.rm(folderPath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error("Erro ao excluir a pasta zipada:", err);
      } else {
        console.log("Pasta zipada excluída com sucesso");
      }
    });
  });
});
