import { getSinglePage } from '../../../lib/ghost';
import Image from 'next/image';
import { Page } from '../../types';
import { Metadata } from 'next';

// This makes the page dynamic instead of static
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getSinglePage(params.slug) as Page | null;
  return {
    title: page?.title || 'Page not found',
    description: page?.excerpt || '',
  };
}

export default async function PageComponent({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getSinglePage(params.slug) as Page | null;

  if (!page) {
    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Page not found</h1>
      </div>
    );
  }

  return (
    <article className="min-h-screen p-8 max-w-3xl mx-auto">
      {page.feature_image && (
        <div className="relative w-full h-64 mb-8">
          <Image 
            src={page.feature_image} 
            alt={page.title} 
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      <div className="prose lg:prose-xl max-w-none">
        <div dangerouslySetInnerHTML={{ __html: page.html || '' }} />
      </div>
    </article>
  );
}
