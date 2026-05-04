import { Routes, Route } from 'react-router-dom';
import BlogPage from '../pages/BlogPage';
import BlogPostPage from '../pages/BlogPostPage';
import BlogCreatePage from '../pages/BlogCreatePage';
import BlogEditPage from '../pages/BlogEditPage';
import BlogLanding from '../components/BlogLanding';

const BlogRoutes = () => (
  <Routes>
    <Route path="/" element={<BlogPage />}>
      <Route index element={<BlogLanding />} />
      <Route path="new" element={<BlogCreatePage />} />
      <Route path=":id" element={<BlogPostPage />} />
      <Route path=":id/edit" element={<BlogEditPage />} />
    </Route>
  </Routes>
);

export default BlogRoutes;
