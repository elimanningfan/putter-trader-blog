import { getPosts } from '../lib/ghost';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from './types';

// This makes the page dynamic instead of static
export const dynamic = 'force-dynamic';

export default async function Home() {
  let posts: Post[] = [];
  try {
    const fetchedPosts = await getPosts();
    if (fetchedPosts) {
      posts = fetchedPosts;
    }
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }

  return (
    <div className="relative bg-gradient-to-br from-purple-900 to-purple-600 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-5xl font-bold mb-8">
          Thoughts, stories and ideas.
        </h1>
        <div className="max-w-xl mx-auto">
          <div className="flex items-center bg-white rounded-full p-1">
            <input
              type="email"
              placeholder="jamie@example.com"
              className="flex-1 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none rounded-full"
            />
            <button className="px-6 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: Post) => (
                <article key={post.id} className="flex flex-col">
                  {post.feature_image && (
                    <Link href={`/post/${post.slug}`} className="relative block h-64 mb-4">
                      <Image
                        src={post.feature_image}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </Link>
                  )}
                  <Link 
                    href={`/post/${post.slug}`}
                    className="text-xl font-bold text-gray-900 hover:text-purple-600 mb-2"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                  <Link
                    href={`/post/${post.slug}`}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
