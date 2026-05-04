import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import BlogEditButton from '../components/BlogEditButton';
import Spinner from '../components/Spinner';

const BlogPostPage = ({ currentUser }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(res => res.json())
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <Spinner loading={true} />
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <div className="py-8 text-xl">The blog post you wanted to see isn't available right now.</div>
        <Link to="/blog" onClick={() => {if(onMobile){setOpen(false)}}} className={"text-stone-800 text-xl text-center underline hover:text-shadow-lg"}>
            ← Return to blog home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex">
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <BlogEditButton postId={post.id} currentUser={currentUser} />
        <div className="text-sm text-gray-600 mb-4">
          <p>
            {post.user?.name || 'Unknown Author'} ·{' '}
            {new Date(post.dateCreated).toLocaleDateString()}
          </p>
          {post.dateUpdated && (
            <p className="italic text-gray-500">
              Updated: {new Date(post.dateUpdated).toLocaleString()}
            </p>
          )}
        </div>

        <div className="prose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="py-4">
          <Link to="/blog" onClick={() => {if(onMobile){setOpen(false)}}} className={"text-stone-800 text-center underline hover:text-shadow-lg"}>
            ← Return to blog home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage;
