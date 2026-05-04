import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

const BlogEditButton = ({ postId }) => {
    const { user, isLoggedIn } = useUser();
    const isAnAdmin = isLoggedIn && user?.isAdmin;

  if (!isAnAdmin) return null;

  return (
    <Link
      to={`/blog/${postId}/edit`}
      className="inline-block px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 my-3"
    >
      Edit
    </Link>
  );
};

export default BlogEditButton;
