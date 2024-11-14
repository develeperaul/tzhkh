// imageOptimizer.js
import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function optimizeImages() {
  // fs.mkdir("dist/assets/img", (err) => {
  //   console.log("test2");
  //   if (err) {
  //     throw err; // не удалось создать папку
  //   }
  //   console.log("Папка успешно создана");
  // });
  const imageDir = path.resolve(__dirname, "dist/assets/img");
  const files = fs.readdirSync(imageDir);

  for (const file of files) {
    if (/\.(jpe?g|png)$/i.test(file)) {
      const inputFilePath = path.join(imageDir, file);
      const outputFilePathWebP = path.join(
        imageDir,
        `${path.basename(file, path.extname(file))}.webp`
      );
      const outputFilePathAVIF = path.join(
        imageDir,
        `${path.basename(file, path.extname(file))}.avif`
      );

      // Конвертация в WebP
      await sharp(inputFilePath)
        .webp({ lossless: true, quality: 75 })
        .toFile(outputFilePathWebP);

      // Конвертация в AVIF
      await sharp(inputFilePath)
        .avif({ quality: 75 })
        .toFile(outputFilePathAVIF);
    }
  }
}

optimizeImages();
