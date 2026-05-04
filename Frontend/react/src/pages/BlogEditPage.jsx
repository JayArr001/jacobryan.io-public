import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useUser } from '../UserContext';
import { csrfFetch } from '../utils/csrfFetch';
import Spinner from '../components/Spinner';
import BlogSubmitButton from '../components/BlogSubmitButton';

const BlogEditPage = () => {
  const { id } = useParams(); //blog id from URL
  const { isLoggedIn } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loadingPost, setLoadingPost] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  //Fetch user dat
  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/user/me', { credentials: 'include' })
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch user");
          return res.json();
        })
        .then(data => setCurrentUser(data))
        .finally(() => setLoadingUser(false));
    } else {
      setLoadingUser(false);
    }
  }, [isLoggedIn]);

  //Fetch blog posts
  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch blog post");
        return res.json();
      })
      .then(post => {
        setTitle(post.title);
        setContent(post.content);
      })
      .finally(() => setLoadingPost(false));
  }, [id]);

  if (loadingUser || loadingPost) {
    return (
      <div className="p-6">
        <Spinner loading={true} />
      </div>
    );
  }

  if (!isLoggedIn || !currentUser?.isAdmin) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        You do not have permission to edit this blog post.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const updatedPost = { title, content };

      const res = await csrfFetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPost),
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error("Failed to update blog post");
      }

      navigate(`/blog/${id}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium mb-2">New Title</label>
          <input
            type="text"
            className="border border-gray-800 rounded px-3 py-2 w-full bg-neutral-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Content (Markdown Supported)</label>
          <textarea
            className="border border-gray-800 rounded px-3 py-2 w-full h-64 bg-neutral-100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" className="text-stone-800 underline hover:shadow-xl">
          Markdown cheat-sheet ↗ &#40;external&#41;</a>
        </div>

        <BlogSubmitButton submitting={submitting} label="Update Post" />
      </form>

      {content && (
        <div className="mt-4">
          <hr className="my-5"/>
          <h2 className="text-2xl font-semibold mb-4 text-stone-800">Preview</h2>
          <div className="prose py-4 text-stone-800">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditPage;
