import {
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";
import { DocsPage } from "@/components/layout/notebook/page";
import { getPageImage, laravelSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: PageProps<"/laravel/[[...slug]]">) {
  const params = await props.params;
  const page = laravelSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const gitConfig = {
    user: "work-rjkashyap",
    repo: "unified-ui",
    branch: "main",
  };

  // If it's the root laravel page, make it full width
  const isRoot = !params.slug || params.slug.length === 0;

  return (
    <DocsPage toc={page.data.toc} full={isRoot || page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      {!isRoot && (
        <div className="flex flex-row gap-2 items-center border-b pb-6">
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions
            markdownUrl={`${page.url}.mdx`}
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/laravel/${page.path}`}
          />
        </div>
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(laravelSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return laravelSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/laravel/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = laravelSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
