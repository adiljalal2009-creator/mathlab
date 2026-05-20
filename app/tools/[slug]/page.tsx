import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { tools } from '@/lib/seo/tools';

const ToolIsland = dynamic(() => import('@/components/tools/ToolIsland'), { ssr: false });

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = tools.find((x) => x.slug === slug);
  if (!t) return {};
  return {
    title: `${t.name} — Free Online`,
    description: t.metaDescription,
    alternates: { canonical: `/tools/${t.slug}` },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tools.find((x) => x.slug === slug);
  if (!t) notFound();
  return (
    <article className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold">{t.name}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{t.tagline}</p>
      <div className="mt-8">
        <ToolIsland slug={t.slug} />
      </div>
    </article>
  );
}
