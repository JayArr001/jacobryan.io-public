import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

const BlogCreateButton = () => {
    const { user, isLoggedIn } = useUser();
    const isAnAdmin = isLoggedIn && user?.isAdmin;

  if (!isAnAdmin) return null;

  return (
    <Link
      to="/blog/new"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:underline"
    >
      Create New Blogpost
    </Link>
  );
};

export default BlogCreateButton;
