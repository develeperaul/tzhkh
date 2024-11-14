// vite.config.js
import { defineConfig } from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vite/dist/node/index.js";
import vituum from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vituum/src/index.js";
import pug from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/@vituum/vite-plugin-pug/index.js";
import tailwindcss from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/@vituum/vite-plugin-tailwindcss/index.js";
import { ViteImageOptimizer } from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import viteCompression from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vite-plugin-compression/dist/index.mjs";
import createSvgSpritePlugin from "file:///Users/raulbajmuhametov/work/webpack/tzhkh/node_modules/vite-plugin-svg-sprite/esm/index.js";
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
    // createSvgSpritePlugin({
    //   symbolId: "icon-[name]",
    //   include: ["**/src/assets/icons/**.svg"],
    // }),
    createSvgIconsPlugin({
      iconDirs: [path3.resolve(process.cwd(), "src/assets/icons")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]",
      inject: "body-last" | "body-first",
      customDomId: "__svg__icons__dom__"
    })
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
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `assets/${extType}/[name]-[hash][extname]`;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiaW1hZ2VPcHRpbWl6ZXIuanMiLCAid3JhcEltZ1dpdGhQaWN0dXJlLmpzIiwgImltYWdlT3B0aW1pemVyQ29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcmF1bGJham11aGFtZXRvdi93b3JrL3dlYnBhY2svdHpoa2gvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuaW1wb3J0IHZpdHV1bSBmcm9tIFwidml0dXVtXCI7XG5pbXBvcnQgcHVnIGZyb20gXCJAdml0dXVtL3ZpdGUtcGx1Z2luLXB1Z1wiO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdml0dXVtL3ZpdGUtcGx1Z2luLXRhaWx3aW5kY3NzXCI7XG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tIFwidml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyXCI7XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcblxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcbmltcG9ydCBjcmVhdGVTdmdTcHJpdGVQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1zcHJpdGVcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG4vLyBpbXBvcnQgVml0ZVdlYnAgZnJvbSBcInZpdGUtcGx1Z2luLXdlYnAtZ2VuZXJhdG9yXCI7XG4vLyBpbXBvcnQgeyBpbWFnZXRvb2xzIH0gZnJvbSBcInZpdGUtaW1hZ2V0b29sc1wiO1xuLy8gaW1wb3J0IFZpdGVQbHVnaW5XZWJwQ29tcHJlc3MgZnJvbSBcInZpdGUtcGx1Z2luLXdlYnAtY29tcHJlc3NcIjtcblxuLy8gaW1wb3J0IHBvc3Rjc3MgZnJvbSBcIkB2aXR1dW0vdml0ZS1wbHVnaW4tcG9zdGNzc1wiO1xuXG5pbXBvcnQgeyBvcHRpbWl6ZUltYWdlcyB9IGZyb20gXCIuL2ltYWdlT3B0aW1pemVyXCI7XG5pbXBvcnQgeyB3cmFwSW1nV2l0aFBpY3R1cmUgfSBmcm9tIFwiLi93cmFwSW1nV2l0aFBpY3R1cmVcIjtcbmltcG9ydCB7IERFRkFVTFRfT1BUSU9OUyB9IGZyb20gXCIuL2ltYWdlT3B0aW1pemVyQ29uZmlnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHB1YmxpY0RpcjogXCJwdWJsaWNcIixcbiAgLy8gcm9vdDogXCIuL1wiLFxuICAvLyBidWlsZDoge1xuXG4gIC8vIH0sXG4gIHBsdWdpbnM6IFtcbiAgICAvLyBcdTA0MUZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0QgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRVx1MDQzRlx1MDQ0Mlx1MDQzOFx1MDQzQ1x1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOCBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzlcbiAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoREVGQVVMVF9PUFRJT05TKSxcblxuICAgIC8vIFx1MDQxRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDQxXHUwNDM2XHUwNDMwXHUwNDQyXHUwNDM4XHUwNDRGIFx1MDQ0NFx1MDQzMFx1MDQzOVx1MDQzQlx1MDQzRVx1MDQzMlxuICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06IFwiYnJvdGxpQ29tcHJlc3NcIixcbiAgICB9KSxcbiAgICB2aXR1dW0oe1xuICAgICAgaW1wb3J0czoge1xuICAgICAgICBmaWxlbmFtZVBhdHRlcm46IHtcbiAgICAgICAgICBcIisuY3NzXCI6IFtdLFxuICAgICAgICAgIFwiKy5zY3NzXCI6IFwic3JjL3N0eWxlc1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBwdWcoe1xuICAgICAgcm9vdDogXCIuL3NyY1wiLFxuICAgIH0pLFxuICAgIHRhaWx3aW5kY3NzKCksXG4gICAge1xuICAgICAgbmFtZTogXCJvcHRpbWl6ZS1pbWFnZXMtYW5kLXdyYXBcIixcbiAgICAgIGNsb3NlQnVuZGxlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IG9wdGltaXplSW1hZ2VzKCk7XG4gICAgICAgIGF3YWl0IHdyYXBJbWdXaXRoUGljdHVyZSgpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIC8vIGNyZWF0ZVN2Z1Nwcml0ZVBsdWdpbih7XG4gICAgLy8gICBzeW1ib2xJZDogXCJpY29uLVtuYW1lXVwiLFxuICAgIC8vICAgaW5jbHVkZTogW1wiKiovc3JjL2Fzc2V0cy9pY29ucy8qKi5zdmdcIl0sXG4gICAgLy8gfSksXG5cbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9hc3NldHMvaWNvbnNcIildLFxuICAgICAgLy8gU3BlY2lmeSBzeW1ib2xJZCBmb3JtYXRcbiAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCIsXG4gICAgICBpbmplY3Q6IFwiYm9keS1sYXN0XCIgfCBcImJvZHktZmlyc3RcIixcbiAgICAgIGN1c3RvbURvbUlkOiBcIl9fc3ZnX19pY29uc19fZG9tX19cIixcbiAgICB9KSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhcGk6IFwibW9kZXJuLWNvbXBpbGVyXCIsIC8vIG9yIFwibW9kZXJuXCIsIFwibGVnYWN5XCJcbiAgICAgICAgaW1wb3J0ZXJzOiBbXG4gICAgICAgICAgLy8gLi4uXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgbGV0IGV4dFR5cGUgPSBhc3NldEluZm8ubmFtZS5zcGxpdChcIi5cIikuYXQoMSk7XG4gICAgICAgICAgaWYgKC9wbmd8anBlP2d8c3ZnfGdpZnx0aWZmfGJtcHxpY28vaS50ZXN0KGV4dFR5cGUpKSB7XG4gICAgICAgICAgICBleHRUeXBlID0gXCJpbWdcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGBhc3NldHMvJHtleHRUeXBlfS9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdYDtcbiAgICAgICAgfSxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgLy8gbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgIC8vICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XG4gICAgICAgIC8vICAgICByZXR1cm4gaWRcbiAgICAgICAgLy8gICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLy8gICAgICAgLnNwbGl0KFwibm9kZV9tb2R1bGVzL1wiKVsxXVxuICAgICAgICAvLyAgICAgICAuc3BsaXQoXCIvXCIpWzBdXG4gICAgICAgIC8vICAgICAgIC50b1N0cmluZygpO1xuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcmF1bGJham11aGFtZXRvdi93b3JrL3dlYnBhY2svdHpoa2hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9yYXVsYmFqbXVoYW1ldG92L3dvcmsvd2VicGFjay90emhraC9pbWFnZU9wdGltaXplci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcmF1bGJham11aGFtZXRvdi93b3JrL3dlYnBhY2svdHpoa2gvaW1hZ2VPcHRpbWl6ZXIuanNcIjsvLyBpbWFnZU9wdGltaXplci5qc1xuaW1wb3J0IHNoYXJwIGZyb20gXCJzaGFycFwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wdGltaXplSW1hZ2VzKCkge1xuICAvLyBmcy5ta2RpcihcIm5ld19mb2xkZXJcIiwgKGVycikgPT4ge1xuICAvLyAgIGlmIChlcnIpIHRocm93IGVycjsgLy8gXHUwNDNEXHUwNDM1IFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0QyBcdTA0NDFcdTA0M0VcdTA0MzdcdTA0MzRcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDMwXHUwNDNGXHUwNDNBXHUwNDQzXG4gIC8vICAgY29uc29sZS5sb2coXCJcdTA0MUZcdTA0MzBcdTA0M0ZcdTA0M0FcdTA0MzAgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQ0MVx1MDQzRVx1MDQzN1x1MDQzNFx1MDQzMFx1MDQzRFx1MDQzMFwiKTtcbiAgLy8gfSk7XG4gIGNvbnN0IGltYWdlRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0L2Fzc2V0cy9pbWdcIik7XG4gIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoaW1hZ2VEaXIpO1xuXG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgIGlmICgvXFwuKGpwZT9nfHBuZykkL2kudGVzdChmaWxlKSkge1xuICAgICAgY29uc3QgaW5wdXRGaWxlUGF0aCA9IHBhdGguam9pbihpbWFnZURpciwgZmlsZSk7XG4gICAgICBjb25zdCBvdXRwdXRGaWxlUGF0aFdlYlAgPSBwYXRoLmpvaW4oXG4gICAgICAgIGltYWdlRGlyLFxuICAgICAgICBgJHtwYXRoLmJhc2VuYW1lKGZpbGUsIHBhdGguZXh0bmFtZShmaWxlKSl9LndlYnBgXG4gICAgICApO1xuICAgICAgY29uc3Qgb3V0cHV0RmlsZVBhdGhBVklGID0gcGF0aC5qb2luKFxuICAgICAgICBpbWFnZURpcixcbiAgICAgICAgYCR7cGF0aC5iYXNlbmFtZShmaWxlLCBwYXRoLmV4dG5hbWUoZmlsZSkpfS5hdmlmYFxuICAgICAgKTtcblxuICAgICAgLy8gXHUwNDFBXHUwNDNFXHUwNDNEXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQyXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQzMiBXZWJQXG4gICAgICBhd2FpdCBzaGFycChpbnB1dEZpbGVQYXRoKVxuICAgICAgICAud2VicCh7IGxvc3NsZXNzOiB0cnVlLCBxdWFsaXR5OiA3NSB9KVxuICAgICAgICAudG9GaWxlKG91dHB1dEZpbGVQYXRoV2ViUCk7XG5cbiAgICAgIC8vIFx1MDQxQVx1MDQzRVx1MDQzRFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0Mlx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0MzIgQVZJRlxuICAgICAgYXdhaXQgc2hhcnAoaW5wdXRGaWxlUGF0aClcbiAgICAgICAgLmF2aWYoeyBxdWFsaXR5OiA3NSB9KVxuICAgICAgICAudG9GaWxlKG91dHB1dEZpbGVQYXRoQVZJRik7XG4gICAgfVxuICB9XG59XG5cbm9wdGltaXplSW1hZ2VzKCk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9yYXVsYmFqbXVoYW1ldG92L3dvcmsvd2VicGFjay90emhraFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoL3dyYXBJbWdXaXRoUGljdHVyZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcmF1bGJham11aGFtZXRvdi93b3JrL3dlYnBhY2svdHpoa2gvd3JhcEltZ1dpdGhQaWN0dXJlLmpzXCI7Ly8gd3JhcEltZ1dpdGhQaWN0dXJlLmpzXG5pbXBvcnQgKiBhcyBjaGVlcmlvIGZyb20gXCJjaGVlcmlvXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JhcEltZ1dpdGhQaWN0dXJlKCkge1xuICBjb25zdCBodG1sRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpO1xuICBjb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGh0bWxEaXIpO1xuXG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgIGlmIChmaWxlLmVuZHNXaXRoKFwiLmh0bWxcIikpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGh0bWxEaXIsIGZpbGUpO1xuICAgICAgbGV0IGh0bWwgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsIFwidXRmLThcIik7XG4gICAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGh0bWwpO1xuXG4gICAgICAvLyBcdTA0MUVcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzBcdTA0NDdcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDMyXHUwNDQxXHUwNDM1IDxpbWc+IFx1MDQzMiA8cGljdHVyZT5cbiAgICAgICQoXCJpbWdcIikuZWFjaCgoaSwgZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBpbWcgPSAkKGVsZW0pO1xuICAgICAgICBjb25zdCBzcmMgPSBpbWcuYXR0cihcInNyY1wiKTtcbiAgICAgICAgY29uc3Qgd2VicFNyYyA9IGAke3NyYy5yZXBsYWNlKC9cXC4oanBlZ3xqcGd8cG5nKSQvaSwgXCIud2VicFwiKX1gO1xuICAgICAgICBjb25zdCBhdmlmU3JjID0gYCR7c3JjLnJlcGxhY2UoL1xcLihqcGVnfGpwZ3xwbmcpJC9pLCBcIi5hdmlmXCIpfWA7XG5cbiAgICAgICAgY29uc3QgcGljdHVyZVRhZyA9IGA8cGljdHVyZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3Jjc2V0PVwiJHt3ZWJwU3JjfVwiIHR5cGU9XCJpbWFnZS93ZWJwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyY3NldD1cIiR7YXZpZlNyY31cIiB0eXBlPVwiaW1hZ2UvYXZpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWcucHJvcChcIm91dGVySFRNTFwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3BpY3R1cmU+YDtcblxuICAgICAgICBpbWcucmVwbGFjZVdpdGgocGljdHVyZVRhZyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDRGXHUwNDM1XHUwNDNDIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOSBIVE1MXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCAkLmh0bWwoKSk7XG4gICAgfVxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9yYXVsYmFqbXVoYW1ldG92L3dvcmsvd2VicGFjay90emhraFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3JhdWxiYWptdWhhbWV0b3Yvd29yay93ZWJwYWNrL3R6aGtoL2ltYWdlT3B0aW1pemVyQ29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9yYXVsYmFqbXVoYW1ldG92L3dvcmsvd2VicGFjay90emhraC9pbWFnZU9wdGltaXplckNvbmZpZy5qc1wiOy8vIGltYWdlT3B0aW1pemVyQ29uZmlnLmpzXG5leHBvcnQgY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xuICB0ZXN0OiAvXFwuKGpwZT9nfHBuZ3xnaWZ8dGlmZnx3ZWJwfHN2Z3xhdmlmKSQvaSxcbiAgZXhjbHVkZTogdW5kZWZpbmVkLFxuICBpbmNsdWRlOiB1bmRlZmluZWQsXG4gIGluY2x1ZGVQdWJsaWM6IHRydWUsXG4gIGxvZ1N0YXRzOiB0cnVlLFxuICBhbnNpQ29sb3JzOiB0cnVlLFxuICBzdmc6IHtcbiAgICBtdWx0aXBhc3M6IHRydWUsXG4gICAgcGx1Z2luczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcInByZXNldC1kZWZhdWx0XCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIG92ZXJyaWRlczoge1xuICAgICAgICAgICAgY2xlYW51cE51bWVyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgcmVtb3ZlVmlld0JveDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGVhbnVwSURzOiB7XG4gICAgICAgICAgICBtaW5pZnk6IGZhbHNlLFxuICAgICAgICAgICAgcmVtb3ZlOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnZlcnRQYXRoRGF0YTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgXCJzb3J0QXR0cnNcIixcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJhZGRBdHRyaWJ1dGVzVG9TVkdFbGVtZW50XCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IFt7IHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfV0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHBuZzoge1xuICAgIHF1YWxpdHk6IDc1LCAvLyBcdTA0MjNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFIFBORyBcdTA0M0RcdTA0MzAgNzVcbiAgfSxcbiAganBlZzoge1xuICAgIHF1YWxpdHk6IDc1LCAvLyBcdTA0MjNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFIEpQRUcgXHUwNDNEXHUwNDMwIDc1XG4gIH0sXG4gIGpwZzoge1xuICAgIHF1YWxpdHk6IDc1LCAvLyBcdTA0MjNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFIEpQRyBcdTA0M0RcdTA0MzAgNzVcbiAgfSxcbiAgdGlmZjoge1xuICAgIHF1YWxpdHk6IDc1LCAvLyBcdTA0MjNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzhcdTA0MzJcdTA0MzBcdTA0MzVcdTA0M0MgXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFIFRJRkYgXHUwNDNEXHUwNDMwIDc1XG4gIH0sXG4gIGdpZjoge30sXG4gIHdlYnA6IHtcbiAgICBxdWFsaXR5OiA3NSwgLy8gXHUwNDIzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM4XHUwNDMyXHUwNDMwXHUwNDM1XHUwNDNDIFx1MDQzQVx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzRSBXRUJQIFx1MDQzRFx1MDQzMCA3NVxuICB9LFxuICBhdmlmOiB7XG4gICAgcXVhbGl0eTogNzUsIC8vIFx1MDQyM1x1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzMFx1MDQzMlx1MDQzQlx1MDQzOFx1MDQzMlx1MDQzMFx1MDQzNVx1MDQzQyBcdTA0M0FcdTA0MzBcdTA0NDdcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0M0UgQVZJRiBcdTA0M0RcdTA0MzAgNzVcbiAgfSxcbiAgY2FjaGU6IGZhbHNlLFxuICBjYWNoZUxvY2F0aW9uOiB1bmRlZmluZWQsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVCxTQUFTLG9CQUFvQjtBQUU3VSxPQUFPLFlBQVk7QUFDbkIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsMEJBQTBCO0FBQ25DLFNBQVMsNEJBQTRCO0FBRXJDLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sMkJBQTJCO0FBQ2xDLE9BQU9BLFdBQVU7OztBQ1RqQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLGVBQXNCLGlCQUFpQjtBQUtyQyxRQUFNLFdBQVcsS0FBSyxRQUFRLGtDQUFXLGlCQUFpQjtBQUMxRCxRQUFNLFFBQVEsR0FBRyxZQUFZLFFBQVE7QUFFckMsYUFBVyxRQUFRLE9BQU87QUFDeEIsUUFBSSxrQkFBa0IsS0FBSyxJQUFJLEdBQUc7QUFDaEMsWUFBTSxnQkFBZ0IsS0FB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Q0osU0FBUztBQUFBO0FBQUEsRUFDWDtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBO0FBQUEsRUFDWDtBQUFBLEVBQ0EsT0FBTztBQUFBLEVBQ1AsZUFBZTtBQUNqQjs7O0FIbENBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtYLFNBQVM7QUFBQTtBQUFBLElBRVAsbUJBQW1CLGVBQWU7QUFBQTtBQUFBLElBR2xDLGdCQUFnQjtBQUFBLE1BQ2QsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLFFBQ1AsaUJBQWlCO0FBQUEsVUFDZixTQUFTLENBQUM7QUFBQSxVQUNWLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLE1BQ0YsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLElBQ1o7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLGFBQWEsWUFBWTtBQUN2QixjQUFNLGVBQWU7QUFDckIsY0FBTSxtQkFBbUI7QUFBQSxNQUMzQjtBQUFBLElBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEscUJBQXFCO0FBQUEsTUFDbkIsVUFBVSxDQUFDQyxNQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQTtBQUFBLE1BRTFELFVBQVU7QUFBQSxNQUNWLFFBQVEsY0FBYztBQUFBLE1BQ3RCLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixLQUFLO0FBQUE7QUFBQSxRQUNMLFdBQVc7QUFBQTtBQUFBLFFBRVg7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFVBQVUsS0FBSyxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDNUMsY0FBSSxrQ0FBa0MsS0FBSyxPQUFPLEdBQUc7QUFDbkQsc0JBQVU7QUFBQSxVQUNaO0FBQ0EsaUJBQU8sVUFBVSxPQUFPO0FBQUEsUUFDMUI7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BVWxCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgImZzIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJmcyIsICJwYXRoIl0KfQo=
