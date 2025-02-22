import { getSinglePost } from '../../../lib/ghost';

interface PageProps {
  params: {
    slug: string;
  };
}

const Post = async ({ params }: PageProps) => {
  const post = await getSinglePost(params.slug);

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
        <img 
          src={post.feature_image} 
          alt={post.title} 
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose lg:prose-xl max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
      </div>
    </article>
  );
};

export default Post;
