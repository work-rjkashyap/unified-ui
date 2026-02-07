import {
  company,
  components,
  docs,
  legal,
  resources,
} from "fumadocs-mdx:collections/server";
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

export const legalSource = loader({
  baseUrl: "/legal",
  source: legal.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const companySource = loader({
  baseUrl: "/company",
  source: company.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const resourceSource = loader({
  baseUrl: "/resources",
  source: resources.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(
  page:
    | InferPageType<typeof source>
    | InferPageType<typeof componentSource>
    | InferPageType<typeof legalSource>
    | InferPageType<typeof companySource>
    | InferPageType<typeof resourceSource>,
) {
  const segments = [...page.slugs, "image.png"];
  let prefix = "docs";
  if (page.url.startsWith("/components")) prefix = "components";
  if (page.url.startsWith("/legal")) prefix = "legal";
  if (page.url.startsWith("/company")) prefix = "company";
  if (page.url.startsWith("/resources")) prefix = "resources";

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
