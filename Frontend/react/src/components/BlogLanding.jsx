import { Link } from 'react-router-dom';
import { useEffect, useState, useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import Spinner from '../components/Spinner';
import BlogCreateButton from '../components/BlogCreatebutton';

const BlogLanding = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api/blog')
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
            setPosts(sorted);
        })
        .finally(setLoading(false));
    }, []);

    return(
        <div className="">
            <h1 className="text-3xl font-bold">Latest Posts</h1>
            <div className="flex items-center">
                <hr className="max-lg:w-full max-lg:max-w-[170px] lg:w-[170px] border-b"/>
            </div>
            <div className="mb-4 mt-6">
                <BlogCreateButton />
            </div>

            {loading ? (
                <Spinner loading={true} />
                ) : posts.length === 0 ? (
                    <p className="text-center">No blogs yet. Check back soon!</p>
                ) : (posts.map(post => (
                    <div key={post.id} >
                        <article className="mb-9">
                            <h2 className="text-2xl font-semibold">{post.title}</h2>
                            <div className="text-sm text-gray-600 mb-2">
                                {post.user?.name || 'Unknown Author'} &middot; {new Date(post.dateCreated).toLocaleDateString()}
                                {post.dateUpdated && (
                                    <p className="italic">
                                    Updated: {new Date(post.dateUpdated).toLocaleString()}
                                    </p>
                                )}
                            </div>
                            <div className="prose line-clamp-4">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </div>
                            <Link to={`/blog/${post.id}`} className="text-stone-800 underline hover:text-shadow-lg">Continue reading →</Link>
                            
                        </article>
                        <div className="pb-10 flex items-center relative max-w-[65ch] justify-center">
                            <hr className="max-lg:w-full max-lg:max-w-[170px] lg:w-[170px]"/>
                        </div>
                    </div>
                )))
            }
        </div>
    );
}
export default BlogLanding;