import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["avatars/*.jpg", "avatars/*.png"],
      manifest: {
        name: "Marquinhos & Luquinhas - Sorteio de Vôlei",
        short_name: "Sorteio de Vôlei",
        description: "Sorteio de times, placar e cadastro de membros do vôlei.",
        start_url: "/team-draw",
        display: "standalone",
        background_color: "#F2F2F7",
        theme_color: "#007AFF",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // fotos de membro cadastradas via link de URL (host externo) — cacheia
        // depois do primeiro carregamento com sucesso, para funcionar offline
        // nas próximas visitas.
        runtimeCaching: [
          {
            urlPattern: ({ request, sameOrigin }) =>
              !sameOrigin && request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "external-member-photos",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
