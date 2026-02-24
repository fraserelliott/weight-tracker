import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const platform = env.PLATFORM || "web";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve("src"),
        "@data": path.resolve("src/data"),
        "@contexts": path.resolve("src/contexts"),
        "@hooks": path.resolve("src/hooks"),
        "@components": path.resolve("src/components"),
        "@store": defineStore(platform),
        "@util": path.resolve("src/util"),
        "@styles": path.resolve("src/styles"),
        "@pages": path.resolve("src/pages"),
      },
    },
  };
});

function defineStore(platform) {
  switch (platform) {
    case "web":
      return path.resolve("src/data/storage-web.js");
    // case "native":
    //   return path.resolve("src/data/storage-native.js");
    default:
      throw new Error(`Unknown PLATFORM: ${platform}`);
  }
}
