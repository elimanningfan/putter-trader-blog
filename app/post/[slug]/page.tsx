import { getSinglePost } from '../../../lib/ghost';
import Image from 'next/image';
import { Post } from '../../types';

interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await getSinglePost(context.params.slug) as Post | null;

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Add logic to generate static paths for posts
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getSinglePost(params.slug) as Post | null;

  if (!post) {
    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Post not found</h1>
      </div>
    );
  }

  return (
    <article className="min-h-screen p-8 max-w-3xl mx-auto">
      {post.feature_image && (
        <div className="relative w-full h-64 mb-8">
          <Image 
            src={post.feature_image} 
            alt={post.title} 
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose lg:prose-xl max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
      </div>
    </article>
  );
}
