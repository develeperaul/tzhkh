import { defineConfig } from "vite";

import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";
import tailwindcss from "@vituum/vite-plugin-tailwindcss";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import viteCompression from "vite-plugin-compression";
// import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import createSvgSpritePlugin from "vite-plugin-svg-spriter";
import path from "path";
// import ViteWebp from "vite-plugin-webp-generator";
// import { imagetools } from "vite-imagetools";
// import VitePluginWebpCompress from "vite-plugin-webp-compress";

// import postcss from "@vituum/vite-plugin-postcss";

import { optimizeImages } from "./imageOptimizer";
import { wrapImgWithPicture } from "./wrapImgWithPicture";
import { DEFAULT_OPTIONS } from "./imageOptimizerConfig";

// const SVG_FOLDER_PATH = path.resolve(__dirname, "src/assets", "icons");
const SRC_PATH = path.resolve(__dirname, "src");
const SVG_FOLDER_PATH = path.resolve(SRC_PATH, "assets", "icons");
export default defineConfig({
  publicDir: "public",
  // root: "./",
  base: "./",
  // build: {

  // },
  plugins: [
    // Плагин для оптимизации изображений
    ViteImageOptimizer(DEFAULT_OPTIONS),

    // Плагин для сжатия файлов
    // viteCompression({
    //   algorithm: "brotliCompress",
    // }),
    vituum({
      imports: {
        filenamePattern: {
          "+.css": [],
          "+.scss": "src/styles",
        },
      },
    }),
    pug({
      root: "./src",
    }),
    tailwindcss(),
    {
      name: "optimize-images-and-wrap",
      closeBundle: async () => {
        await optimizeImages();
        await wrapImgWithPicture();
      },
    },
    createSvgSpritePlugin({ svgFolder: SVG_FOLDER_PATH }),

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
        api: "modern-compiler", // or "modern", "legacy"

        importers: [
          // ...
        ],
      },
    },
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
          // console.log(`assets/${extType}/[name]-[extname]`);

          return `assets/${extType}/[name]-[extname]`;
        },
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",

        // manualChunks(id) {
        //   if (id.includes("node_modules")) {
        //     return id
        //       .toString()
        //       .split("node_modules/")[1]
        //       .split("/")[0]
        //       .toString();
        //   }
        // },
      },
    },
  },
});
