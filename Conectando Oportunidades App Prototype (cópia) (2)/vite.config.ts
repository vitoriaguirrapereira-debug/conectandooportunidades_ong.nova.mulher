import { defineConfig, type HtmlTagDescriptor, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

function cleanSiteShell(): Plugin {
  const title = "Conectando Oportunidades | ONG Nova Mulher"
  const description =
    "Plataforma de cursos e oportunidades gratuitas para profissionalizar seu negócio e empreender."
  const language = "pt-BR"

  return {
    name: "clean-site-shell",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const result = html
          .replace("<!-- figma:lang -->", language)
          .replace("<!-- figma:title -->", title)
          .replace("<!-- figma:head-start -->", "")
          .replace("<!-- figma:head-end -->", "")
          .replace("<!-- figma:body-start -->", "")
          .replace("<!-- figma:body-end -->", "")

        const tags: HtmlTagDescriptor[] = [
          {
            tag: "meta",
            attrs: { name: "description", content: description },
            injectTo: "head",
          },
          {
            tag: "meta",
            attrs: { property: "og:title", content: title },
            injectTo: "head",
          },
          {
            tag: "meta",
            attrs: { property: "og:description", content: description },
            injectTo: "head",
          },
        ]

        return { html: result, tags }
      },
    },
  }
}

export default defineConfig({
  base: "./",
  build: {
    sourcemap: false,
    minify: true,
  },
  plugins: [react(), tailwindcss(), cleanSiteShell()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
