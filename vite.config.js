import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Project_Color_Palette_Genrator/",
  plugins: [tailwindcss(), react()],
});
