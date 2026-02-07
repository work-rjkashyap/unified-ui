import { notFound } from "next/navigation";
import { cn } from "@/lib/cn";
import { legalSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return legalSource.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const page = legalSource.getPage([params.slug]);
  if (!page) return {};

  return {
    title: `${page.data.title} - Unified UI`,
    description: page.data.description,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = legalSource.getPage([params.slug]);
  if (!page) notFound();

  const Content = page.data.body;

  return (
    <div className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fd-foreground mb-4">
            {page.data.title}
          </h1>
          {page.data.description && (
            <p className="text-lg text-fd-muted-foreground">
              {page.data.description}
            </p>
          )}
          <div className="mt-8 flex items-center justify-center">
            <div className="h-px w-12 bg-fd-primary/20" />
          </div>
        </header>

        <div
          className={cn(
            "prose prose-sm sm:prose-base prose-fd dark:prose-invert max-w-none",
            "prose-headings:font-bold prose-headings:tracking-tight",
            "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6",
            "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4",
            "prose-p:leading-relaxed prose-p:text-fd-muted-foreground",
            "prose-li:text-fd-muted-foreground",
            "prose-strong:text-fd-foreground prose-strong:font-semibold",
          )}
        >
          <Content components={getMDXComponents({})} />
        </div>
      </article>
    </div>
  );
}
