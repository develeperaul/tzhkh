// vite.config.js
import { defineConfig } from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vite/dist/node/index.js";
import vituum from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vituum/src/index.js";
import pug from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/@vituum/vite-plugin-pug/index.js";
import tailwindcss from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/@vituum/vite-plugin-tailwindcss/index.js";
import { ViteImageOptimizer } from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import viteCompression from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vite-plugin-compression/dist/index.mjs";
import createSvgSpritePlugin from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vite-plugin-svg-spriter/lib/index.js";
import path3 from "path";

// imageOptimizer.js
import sharp from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/sharp/lib/index.js";
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "/Users/raulbajmuhametov/work/webpack/tzhkh";
async function optimizeImages() {
  const imageDir = path.resolve(__vite_injected_original_dirname, "dist/assets/img");
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
      await sharp(inputFilePath).webp({ lossless: true, quality: 75 }).toFile(outputFilePathWebP);
      await sharp(inputFilePath).avif({ quality: 75 }).toFile(outputFilePathAVIF);
    }
  }
}
optimizeImages();

// wrapImgWithPicture.js
import * as cheerio from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/cheerio/dist/esm/index.js";
import fs2 from "fs";
import path2 from "path";
var __vite_injected_original_dirname2 = "/Users/raulbajmuhametov/work/webpack/tzhkh";
async function wrapImgWithPicture() {
  const htmlDir = path2.resolve(__vite_injected_original_dirname2, "dist");
  const files = fs2.readdirSync(htmlDir);
  for (const file of files) {
    if (file.endsWith(".html")) {
      const filePath = path2.join(htmlDir, file);
      let html = fs2.readFileSync(filePath, "utf-8");
      const $ = cheerio.load(html);
      $("img").each((i, elem) => {
        const img = $(elem);
        const src = img.attr("src");
        const webpSrc = `${src.replace(/\.(jpeg|jpg|png)$/i, ".webp")}`;
        const avifSrc = `${src.replace(/\.(jpeg|jpg|png)$/i, ".avif")}`;
        const pictureTag = `<picture>
                              <source srcset="${webpSrc}" type="image/webp">
                              <source srcset="${avifSrc}" type="image/avif">
                              ${img.prop("outerHTML")}
                            </picture>`;
        img.replaceWith(pictureTag);
      });
      fs2.writeFileSync(filePath, $.html());
    }
  }
}

// imageOptimizerConfig.js
var DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: void 0,
  include: void 0,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false
          },
          cleanupIDs: {
            minify: false,
            remove: false
          },
          convertPathData: false
        }
      },
      "sortAttrs",
      {
        name: "addAttributesToSVGElement",
        params: {
          attributes: [{ xmlns: "http://www.w3.org/2000/svg" }]
        }
      }
    ]
  },
  png: {
    quality: 75
    // Устанавливаем качество PNG на 75
  },
  jpeg: {
    quality: 75
    // Устанавливаем качество JPEG на 75
  },
  jpg: {
    quality: 75
    // Устанавливаем качество JPG на 75
  },
  tiff: {
    quality: 75
    // Устанавливаем качество TIFF на 75
  },
  gif: {},
  webp: {
    quality: 75
    // Устанавливаем качество WEBP на 75
  },
  avif: {
    quality: 75
    // Устанавливаем качество AVIF на 75
  },
  cache: false,
  cacheLocation: void 0
};

// vite.config.js
var __vite_injected_original_dirname3 = "/Users/raulbajmuhametov/work/webpack/tzhkh";
var SRC_PATH = path3.resolve(__vite_injected_original_dirname3, "src");
var SVG_FOLDER_PATH = path3.resolve(SRC_PATH, "assets", "icons");
var vite_config_default = defineConfig({
  publicDir: "public",
  // root: "./",
  // build: {
  // },
  plugins: [
    // Плагин для оптимизации изображений
    ViteImageOptimizer(DEFAULT_OPTIONS),
    // Плагин для сжатия файлов
    viteCompression({
      algorithm: "brotliCompress"
    }),
    vituum({
      imports: {
        filenamePattern: {
          "+.css": [],
          "+.scss": "src/styles"
        }
      }
    }),
    pug({
      root: "./src"
    }),
    tailwindcss(),
    {
      name: "optimize-images-and-wrap",
      closeBundle: async () => {
        await optimizeImages();
        await wrapImgWithPicture();
      }
    },
    createSvgSpritePlugin({ svgFolder: SVG_FOLDER_PATH })
    // createSvgSpritePlugin({
    //   // symbolId: "icon-[name]-[hash]",
    //   symbolId: "icon-[name]",
    //   include: ["**/src/assets/icons/*.svg"],
    // }),
    // createSvgIconsPlugin({
    //   iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    //   // Specify symbolId format
    //   symbolId: "icon-[dir]-[name]",
    //   inject: "body-last" | "body-first",
    //   customDomId: "__svg__icons__dom__",
    // }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        // or "modern", "legacy"
        importers: [
          // ...
        ]
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          console.log(extType);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          if (/woff2?|ttf|eot/i.test(extType)) {
            extType = "fonts";
          }
          return `assets/${extType}/[name]-[extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js"
        // manualChunks(id) {
        //   if (id.includes("node_modules")) {
        //     return id
        //       .toString()
        //       .split("node_modules/")[1]
        //       .split("/")[0]
        //       .toString();
        //   }
        // },
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiaW1hZ2VPcHRpbWl6ZXIuanMiLCAid3JhcEltZ1dpdGhQaWN0dXJlLmpzIiwgImltYWdlT3B0aW1pemVyQ29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcmF1bGJham11aGFtZXRvdi93b3JrL3dlYnBhY2svdHpoa2gvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuaW1wb3J0IHZpdHV1bSBmcm9tIFwidml0dXVtXCI7XG5pbXBvcnQgcHVnIGZyb20gXCJAdml0dXVtL3ZpdGUtcGx1Z2luLXB1Z1wiO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdml0dXVtL3ZpdGUtcGx1Z2luLXRhaWx3aW5kY3NzXCI7XG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tIFwidml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyXCI7XG4vLyBpbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcblxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcbi8vIGltcG9ydCBjcmVhdGVTdmdTcHJpdGVQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1zcHJpdGVcIjtcbmltcG9ydCBjcmVhdGVTdmdTcHJpdGVQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1zcHJpdGVyXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuLy8gaW1wb3J0IFZpdGVXZWJwIGZyb20gXCJ2aXRlLXBsdWdpbi13ZWJwLWdlbmVyYXRvclwiO1xuLy8gaW1wb3J0IHsgaW1hZ2V0b29scyB9IGZyb20gXCJ2aXRlLWltYWdldG9vbHNcIjtcbi8vIGltcG9ydCBWaXRlUGx1Z2luV2VicENvbXByZXNzIGZyb20gXCJ2aXRlLXBsdWdpbi13ZWJwLWNvbXByZXNzXCI7XG5cbi8vIGltcG9ydCBwb3N0Y3NzIGZyb20gXCJAdml0dXVtL3ZpdGUtcGx1Z2luLXBvc3Rjc3NcIjtcblxuaW1wb3J0IHsgb3B0aW1pemVJbWFnZXMgfSBmcm9tIFwiLi9pbWFnZU9wdGltaXplclwiO1xuaW1wb3J0IHsgd3JhcEltZ1dpdGhQaWN0dXJlIH0gZnJvbSBcIi4vd3JhcEltZ1dpdGhQaWN0dXJlXCI7XG5pbXBvcnQgeyBERUZBVUxUX09QVElPTlMgfSBmcm9tIFwiLi9pbWFnZU9wdGltaXplckNvbmZpZ1wiO1xuXG4vLyBjb25zdCBTVkdfRk9MREVSX1BBVEggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9hc3NldHNcIiwgXCJpY29uc1wiKTtcbmNvbnN0IFNSQ19QQVRIID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIik7XG5jb25zdCBTVkdfRk9MREVSX1BBVEggPSBwYXRoLnJlc29sdmUoU1JDX1BBVEgsIFwiYXNzZXRzXCIsIFwiaWNvbnNcIik7XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwdWJsaWNEaXI6IFwicHVibGljXCIsXG4gIC8vIHJvb3Q6IFwiLi9cIixcbiAgLy8gYnVpbGQ6IHtcblxuICAvLyB9LFxuICBwbHVnaW5zOiBbXG4gICAgLy8gXHUwNDFGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0VcdTA0M0ZcdTA0NDJcdTA0MzhcdTA0M0NcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5XG4gICAgVml0ZUltYWdlT3B0aW1pemVyKERFRkFVTFRfT1BUSU9OUyksXG5cbiAgICAvLyBcdTA0MUZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0QgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQ0MVx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0RiBcdTA0NDRcdTA0MzBcdTA0MzlcdTA0M0JcdTA0M0VcdTA0MzJcbiAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgYWxnb3JpdGhtOiBcImJyb3RsaUNvbXByZXNzXCIsXG4gICAgfSksXG4gICAgdml0dXVtKHtcbiAgICAgIGltcG9ydHM6IHtcbiAgICAgICAgZmlsZW5hbWVQYXR0ZXJuOiB7XG4gICAgICAgICAgXCIrLmNzc1wiOiBbXSxcbiAgICAgICAgICBcIisuc2Nzc1wiOiBcInNyYy9zdHlsZXNcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcHVnKHtcbiAgICAgIHJvb3Q6IFwiLi9zcmNcIixcbiAgICB9KSxcbiAgICB0YWlsd2luZGNzcygpLFxuICAgIHtcbiAgICAgIG5hbWU6IFwib3B0aW1pemUtaW1hZ2VzLWFuZC13cmFwXCIsXG4gICAgICBjbG9zZUJ1bmRsZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBvcHRpbWl6ZUltYWdlcygpO1xuICAgICAgICBhd2FpdCB3cmFwSW1nV2l0aFBpY3R1cmUoKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjcmVhdGVTdmdTcHJpdGVQbHVnaW4oeyBzdmdGb2xkZXI6IFNWR19GT0xERVJfUEFUSCB9KSxcblxuICAgIC8vIGNyZWF0ZVN2Z1Nwcml0ZVBsdWdpbih7XG4gICAgLy8gICAvLyBzeW1ib2xJZDogXCJpY29uLVtuYW1lXS1baGFzaF1cIixcbiAgICAvLyAgIHN5bWJvbElkOiBcImljb24tW25hbWVdXCIsXG4gICAgLy8gICBpbmNsdWRlOiBbXCIqKi9zcmMvYXNzZXRzL2ljb25zLyouc3ZnXCJdLFxuICAgIC8vIH0pLFxuXG4gICAgLy8gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgIC8vICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL2ljb25zXCIpXSxcbiAgICAvLyAgIC8vIFNwZWNpZnkgc3ltYm9sSWQgZm9ybWF0XG4gICAgLy8gICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiLFxuICAgIC8vICAgaW5qZWN0OiBcImJvZHktbGFzdFwiIHwgXCJib2R5LWZpcnN0XCIsXG4gICAgLy8gICBjdXN0b21Eb21JZDogXCJfX3N2Z19faWNvbnNfX2RvbV9fXCIsXG4gICAgLy8gfSksXG4gIF0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYXBpOiBcIm1vZGVybi1jb21waWxlclwiLCAvLyBvciBcIm1vZGVyblwiLCBcImxlZ2FjeVwiXG4gICAgICAgIGltcG9ydGVyczogW1xuICAgICAgICAgIC8vIC4uLlxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIGxldCBleHRUeXBlID0gYXNzZXRJbmZvLm5hbWUuc3BsaXQoXCIuXCIpLmF0KDEpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGV4dFR5cGUpO1xuICAgICAgICAgIGlmICgvcG5nfGpwZT9nfHN2Z3xnaWZ8dGlmZnxibXB8aWNvL2kudGVzdChleHRUeXBlKSkge1xuICAgICAgICAgICAgZXh0VHlwZSA9IFwiaW1nXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvd29mZjI/fHR0Znxlb3QvaS50ZXN0KGV4dFR5cGUpKSB7XG4gICAgICAgICAgICBleHRUeXBlID0gXCJmb250c1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYGFzc2V0cy8ke2V4dFR5cGV9L1tuYW1lXS1bZXh0bmFtZV1gO1xuICAgICAgICB9LFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuXG4gICAgICAgIC8vIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAvLyAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGlkXG4gICAgICAgIC8vICAgICAgIC50b1N0cmluZygpXG4gICAgICAgIC8vICAgICAgIC5zcGxpdChcIm5vZGVfbW9kdWxlcy9cIilbMV1cbiAgICAgICAgLy8gICAgICAgLnNwbGl0KFwiL1wiKVswXVxuICAgICAgICAvLyAgICAgICAudG9TdHJpbmcoKTtcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcmF1bGJham11aGFtZXRvdi93b3JrL3dlYnBhY2svdHpoa2gvaW1hZ2VPcHRpbWl6ZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoL2ltYWdlT3B0aW1pemVyLmpzXCI7Ly8gaW1hZ2VPcHRpbWl6ZXIuanNcbmltcG9ydCBzaGFycCBmcm9tIFwic2hhcnBcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcHRpbWl6ZUltYWdlcygpIHtcbiAgLy8gZnMubWtkaXIoXCJkaXN0L2Fzc2V0cy9pbWdcIiwgKGVycikgPT4ge1xuICAvLyAgIGNvbnNvbGUubG9nKFwidGVzdDJcIik7XG4gIC8vICAgaWYgKGVycikge1xuICAvLyAgICAgdGhyb3cgZXJyOyAvLyBcdTA0M0RcdTA0MzUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDIFx1MDQ0MVx1MDQzRVx1MDQzN1x1MDQzNFx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0MzBcdTA0M0ZcdTA0M0FcdTA0NDNcbiAgLy8gICB9XG4gIC8vICAgY29uc29sZS5sb2coXCJcdTA0MUZcdTA0MzBcdTA0M0ZcdTA0M0FcdTA0MzAgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQ0MVx1MDQzRVx1MDQzN1x1MDQzNFx1MDQzMFx1MDQzRFx1MDQzMFwiKTtcbiAgLy8gfSk7XG4gIGNvbnN0IGltYWdlRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0L2Fzc2V0cy9pbWdcIik7XG4gIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoaW1hZ2VEaXIpO1xuXG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgIGlmICgvXFwuKGpwZT9nfHBuZykkL2kudGVzdChmaWxlKSkge1xuICAgICAgY29uc3QgaW5wdXRGaWxlUGF0aCA9IHBhdGguam9pbihpbWFnZURpciwgZmlsZSk7XG4gICAgICBjb25zdCBvdXRwdXRGaWxlUGF0aFdlYlAgPSBwYXRoLmpvaW4oXG4gICAgICAgIGltYWdlRGlyLFxuICAgICAgICBgJHtwYXRoLmJhc2VuYW1lKGZpbGUsIHBhdGguZXh0bmFtZShmaWxlKSl9LndlYnBgXG4gICAgICApO1xuICAgICAgY29uc3Qgb3V0cHV0RmlsZVBhdGhBVklGID0gcGF0aC5qb2luKFxuICAgICAgICBpbWFnZURpcixcbiAgICAgICAgYCR7cGF0aC5iYXNlbmFtZShmaWxlLCBwYXRoLmV4dG5hbWUoZmlsZSkpfS5hdmlmYFxuICAgICAgKTtcblxuICAgICAgLy8gXHUwNDFBXHUwNDNFXHUwNDNEXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQyXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQzMiBXZWJQXG4gICAgICBhd2FpdCBzaGFycChpbnB1dEZpbGVQYXRoKVxuICAgICAgICAud2VicCh7IGxvc3NsZXNzOiB0cnVlLCBxdWFsaXR5OiA3NSB9KVxuICAgICAgICAudG9GaWxlKG91dHB1dEZpbGVQYXRoV2ViUCk7XG5cbiAgICAgIC8vIFx1MDQxQVx1MDQzRVx1MDQzRFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0Mlx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0MzIgQVZJRlxuICAgICAgYXdhaXQgc2hhcnAoaW5wdXRGaWxlUGF0aClcbiAgICAgICAgLmF2aWYoeyBxdWFsaXR5OiA3NSB9KVxuICAgICAgICAudG9GaWxlKG91dHB1dEZpbGVQYXRoQVZJRik7XG4gICAgfVxuICB9XG59XG5cbm9wdGltaXplSW1hZ2VzKCk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9yYXVsYmFqbXVoYW1ldG92L3dvcmsvd2VicGFjay90emhraFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoL3dyYXBJbWdXaXRoUGljdHVyZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcmF1bGJham11aGFtZXRvdi93b3JrL3dlYnBhY2svdHpoa2gvd3JhcEltZ1dpdGhQaWN0dXJlLmpzXCI7Ly8gd3JhcEltZ1dpdGhQaWN0dXJlLmpzXG5pbXBvcnQgKiBhcyBjaGVlcmlvIGZyb20gXCJjaGVlcmlvXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JhcEltZ1dpdGhQaWN0dXJlKCkge1xuICBjb25zdCBodG1sRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpO1xuICBjb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGh0bWxEaXIpO1xuXG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgIGlmIChmaWxlLmVuZHNXaXRoKFwiLmh0bWxcIikpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGh0bWxEaXIsIGZpbGUpO1xuICAgICAgbGV0IGh0bWwgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsIFwidXRmLThcIik7XG4gICAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGh0bWwpO1xuXG4gICAgICAvLyBcdTA0MUVcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzBcdTA0NDdcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDMyXHUwNDQxXHUwNDM1IDxpbWc+IFx1MDQzMiA8cGljdHVyZT5cbiAgICAgICQoXCJpbWdcIikuZWFjaCgoaSwgZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBpbWcgPSAkKGVsZW0pO1xuICAgICAgICBjb25zdCBzcmMgPSBpbWcuYXR0cihcInNyY1wiKTtcbiAgICAgICAgY29uc3Qgd2VicFNyYyA9IGAke3NyYy5yZXBsYWNlKC9cXC4oanBlZ3xqcGd8cG5nKSQvaSwgXCIud2VicFwiKX1gO1xuICAgICAgICBjb25zdCBhdmlmU3JjID0gYCR7c3JjLnJlcGxhY2UoL1xcLihqcGVnfGpwZ3xwbmcpJC9pLCBcIi5hdmlmXCIpfWA7XG5cbiAgICAgICAgY29uc3QgcGljdHVyZVRhZyA9IGA8cGljdHVyZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3Jjc2V0PVwiJHt3ZWJwU3JjfVwiIHR5cGU9XCJpbWFnZS93ZWJwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyY3NldD1cIiR7YXZpZlNyY31cIiB0eXBlPVwiaW1hZ2UvYXZpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWcucHJvcChcIm91dGVySFRNTFwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3BpY3R1cmU+YDtcblxuICAgICAgICBpbWcucmVwbGFjZVdpdGgocGljdHVyZVRhZyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDRGXHUwNDM1XHUwNDNDIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOSBIVE1MXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCAkLmh0bWwoKSk7XG4gICAgfVxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9yYXVsYmFqbXVoYW1ldG92L3dvcmsvd2VicGFjay90emhraFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoL2ltYWdlT3B0aW1pemVyQ29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9yYXVsYmFqbXVoYW1ldG92L3dvcmsvd2VicGFjay90emhraC9pbWFnZU9wdGltaXplckNvbmZpZy5qc1wiOy8vIGltYWdlT3B0aW1pemVyQ29uZmlnLmpzXG5leHBvcnQgY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xuICB0ZXN0OiAvXFwuKGpwZT9nfHBuZ3xnaWZ8dGlmZnx3ZWJwfHN2Z3xhdmlmKSQvaSxcbiAgZXhjbHVkZTogdW5kZWZpbmVkLFxuICBpbmNsdWRlOiB1bmRlZmluZWQsXG4gIGluY2x1ZGVQdWJsaWM6IHRydWUsXG4gIGxvZ1N0YXRzOiB0cnVlLFxuICBhbnNpQ29sb3JzOiB0cnVlLFxuICBzdmc6IHtcbiAgICBtdWx0aXBhc3M6IHRydWUsXG4gICAgcGx1Z2luczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcInByZXNldC1kZWZhdWx0XCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIG92ZXJyaWRlczoge1xuICAgICAgICAgICAgY2xlYW51cE51bWVyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgcmVtb3ZlVmlld0JveDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGVhbnVwSURzOiB7XG4gICAgICAgICAgICBtaW5pZnk6IGZhbHNlLFxuICAgICAgICAgICAgcmVtb3ZlOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnZlcnRQYXRoRGF0YTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgXCJzb3J0QXR0cnNcIixcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJhZGRBdHRyaWJ1dGVzVG9TVkdFbGVtZW50XCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IFt7IHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfV0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHBuZzoge1xuICAgIHF1YWxpdHk6IDc1LCAvLyBcdTA0MjNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFIFBORyBcdTA0M0RcdTA0MzAgNzVcbiAgfSxcbiAganBlZzoge1xuICAgIHF1YWxpdHk6IDc1LCAvLyBcdTA0MjNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFIEpQRUcgXHUwNDNEXHUwNDMwIDc1XG4gIH0sXG4gIGpwZzoge1xuICAgIHF1YWxpdHk6IDc1LCAvLyBcdTA0MjNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFIEpQRyBcdTA0M0RcdTA0MzAgNzVcbiAgfSxcbiAgdGlmZjoge1xuICAgIHF1YWxpdHk6IDc1LCAvLyBcdTA0MjNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFIFRJRkYgXHUwNDNEXHUwNDMwIDc1XG4gIH0sXG4gIGdpZjoge30sXG4gIHdlYnA6IHtcbiAgICBxdWFsaXR5OiA3NSwgLy8gXHUwNDIzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM4XHUwNDMyXHUwNDMwXHUwNDM1XHUwNDNDIFx1MDQzQVx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzRSBXRUJQIFx1MDQzRFx1MDQzMCA3NVxuICB9LFxuICBhdmlmOiB7XG4gICAgcXVhbGl0eTogNzUsIC8vIFx1MDQyM1x1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzMFx1MDQzMlx1MDQzQlx1MDQzOFx1MDQzMlx1MDQzMFx1MDQzNVx1MDQzQyBcdTA0M0FcdTA0MzBcdTA0NDdcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0M0UgQVZJRiBcdTA0M0RcdTA0MzAgNzVcbiAgfSxcbiAgY2FjaGU6IGZhbHNlLFxuICBjYWNoZUxvY2F0aW9uOiB1bmRlZmluZWQsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVCxTQUFTLG9CQUFvQjtBQUU3VSxPQUFPLFlBQVk7QUFDbkIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsMEJBQTBCO0FBR25DLE9BQU8scUJBQXFCO0FBRTVCLE9BQU8sMkJBQTJCO0FBQ2xDLE9BQU9BLFdBQVU7OztBQ1ZqQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLGVBQXNCLGlCQUFpQjtBQVFyQyxRQUFNLFdBQVcsS0FBSyxRQUFRLGtDQUFXLGlCQUFpQjtBQUMxRCxRQUFNLFFBQVEsR0FBRyxZQUFZLFFBQVE7QUFFckMsYUFBVyxRQUFRLE9BQU87QUFDeEIsUUFBSSxrQkFBa0IsS0FBSyxJQUFJLEdBQUc7QUFDaEMsWUFBTSxnQkFBZ0IsS0FBSyxLQUFLLFVBQVUsSUFBSTtBQUM5QyxZQUFNLHFCQUFxQixLQUFLO0FBQUEsUUFDOUI7QUFBQSxRQUNBLEdBQUcsS0FBSyxTQUFTLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDO0FBQUEsTUFDNUM7QUFDQSxZQUFNLHFCQUFxQixLQUFLO0FBQUEsUUFDOUI7QUFBQSxRQUNBLEdBQUcsS0FBSyxTQUFTLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDO0FBQUEsTUFDNUM7QUFHQSxZQUFNLE1BQU0sYUFBYSxFQUN0QixLQUFLLEVBQUUsVUFBVSxNQUFNLFNBQVMsR0FBRyxDQUFDLEVBQ3BDLE9BQU8sa0JBQWtCO0FBRzVCLFlBQU0sTUFBTSxhQUFhLEVBQ3RCLEtBQUssRUFB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QSxNQUNkLFdBQVc7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNQLGlCQUFpQjtBQUFBLFVBQ2YsU0FBUyxDQUFDO0FBQUEsVUFDVixVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxNQUNGLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxJQUNELFlBQVk7QUFBQSxJQUNaO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixhQUFhLFlBQVk7QUFDdkIsY0FBTSxlQUFlO0FBQ3JCLGNBQU0sbUJBQW1CO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxzQkFBc0IsRUFBRSxXQUFXLGdCQUFnQixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFldEQ7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLEtBQUs7QUFBQTtBQUFBLFFBQ0wsV0FBVztBQUFBO0FBQUEsUUFFWDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCLENBQUMsY0FBYztBQUM3QixjQUFJLFVBQVUsVUFBVSxLQUFLLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUM1QyxrQkFBUSxJQUFJLE9BQU87QUFDbkIsY0FBSSxrQ0FBa0MsS0FBSyxPQUFPLEdBQUc7QUFDbkQsc0JBQVU7QUFBQSxVQUNaO0FBQ0EsY0FBSSxrQkFBa0IsS0FBSyxPQUFPLEdBQUc7QUFDbkMsc0JBQVU7QUFBQSxVQUNaO0FBQ0EsaUJBQU8sVUFBVSxPQUFPO0FBQUEsUUFDMUI7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BV2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgImZzIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJmcyIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
