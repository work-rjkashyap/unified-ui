import { components, docs } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const componentSource = loader({
  baseUrl: "/components",
  source: components.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(
  page: InferPageType<typeof source> | InferPageType<typeof componentSource>,
) {
  const segments = [...page.slugs, "image.png"];
  const prefix = page.url.startsWith("/docs") ? "docs" : "components";

  return {
    segments,
    url: `/og/${prefix}/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title}

${processed}`;
}
