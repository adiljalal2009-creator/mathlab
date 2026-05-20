import Link from 'next/link';
import { tools } from '@/lib/seo/tools';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <section className="text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
          MathLab
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
          Free, fast, modern math tools — with step-by-step explanations.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Built by <a href="https://github.com/adiljalal2009-creator" className="font-medium hover:underline">Adil Jalal</a>
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold">Tools</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/tools/${t.slug}`}
                className="block rounded-lg border border-neutral-200 p-4 transition hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
              >
                <span className="font-medium">{t.name}</span>
                <span className="mt-1 block text-sm text-neutral-500">{t.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
