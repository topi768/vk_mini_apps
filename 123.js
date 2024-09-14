import legacy from "@vitejs/plugin-legacy";
import tailwindcss from "tailwindcss";
import { join } from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import alias from "@rollup/plugin-alias";
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    svgr({
      include: /\.svg$/,
      svgrOptions: {
        // icon: true,
      },
    }),
    react(),
    viteBasicSslPlugin(),
    alias({
      entries: [
        { find: "@", replacement: join(__dirname, "src") },
        // {
        //   find: '@server',
        //   replacement: join(__dirname, '../back/src'),
        // },
      ],
    }),
  ],

  build: {
    rollupOptions: {
      // external: ['zod'],
      output: {
        manualChunks: {
          zod: ["zod"],
          formik: ["formik"],
          cropper: ["cropperjs"],
        },
      },
      onLog: (
        level: string,
        log: { message: string | string[] },
        handler: (arg0: any, arg1: unknown) => void,
      ) => {
        // скрыть сообщения о use-client в либах @vkontakte при билде
        if (
          level === "warn" &&
          log.message.includes("use-client") &&
          log.message.includes("@vkontakte") &&
          log.message.includes("was ignored")
        ) {
          return;
        }

        handler(level, log);
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    port: 5173,
    host: "localhost",
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },
  // server: {
  //   port: 5173,
  //   host: true,
  //   hmr: {
  //     host: "192.168.0.10",
  //     clientPort: 5173,
  //   },
  // },
});