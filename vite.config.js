import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/", // Esto asegura que el frontend funcione bien en Render sin importar la URL
  build: {
    outDir: "dist", // Carpeta donde se generará la build de producción
  },
  server: {
    historyApiFallback: true,
  },
});
