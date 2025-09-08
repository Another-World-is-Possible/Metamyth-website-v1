import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

function serveMetamythHtml(): Plugin {
  return {
    name: 'serve-metamyth-html',
    configureServer(server) {
      server.middlewares.use('/metamyth.html', async (req, res, next) => {
        const htmlPath = path.resolve(import.meta.dirname, 'supabase/storage/protected-pages/metamyth.html');
        try {
          let html = fs.readFileSync(htmlPath, 'utf-8');
          html = await server.transformIndexHtml(req.url, html);
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        } catch (e) {
          console.error(e);
          next(e);
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    serveMetamythHtml(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    allowedHosts: [
      "localhost",
      "988dd191-0edc-48bc-8b3b-db88eb37e0ed-00-2r2cmwesixa2f.kirk.replit.dev",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});