import { getPosts } from '../lib/ghost';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  feature_image: string | null;
  excerpt: string;
  slug: string;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: Post) => (
          <article key={post.id} className="border rounded-lg overflow-hidden shadow-lg">
            {post.feature_image && (
              <div className="relative w-full h-48">
                <Image 
                  src={post.feature_image} 
                  alt={post.title} 
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <a 
                href={`/post/${post.slug}`} 
                className="text-blue-600 hover:text-blue-800"
              >
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
