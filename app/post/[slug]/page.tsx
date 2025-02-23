import { getSinglePost } from '../../../lib/ghost';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// This makes the page dynamic instead of static
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getSinglePost(params.slug);
  if (!post) {
    return {
      title: 'Post not found',
      description: 'The requested post could not be found.',
    };
  }
  return {
    title: post.title,
    description: post.excerpt || '',
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getSinglePost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      {post.feature_image && (
        <div className="relative w-full h-96">
          <Image 
            src={post.feature_image} 
            alt={post.title} 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
              {post.excerpt && (
                <p className="text-xl text-gray-200">{post.excerpt}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!post.feature_image && (
          <h1 className="text-5xl font-bold mb-8 text-gray-900">{post.title}</h1>
        )}
        <div className="prose lg:prose-xl max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: post.html || '' }}
            className="text-gray-800"
          />
        </div>
        <div className="mt-12 pt-8 border-t">
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium">
            ← Back to home
          </Link>
        </div>
      </div>
    </article>
  );
}
