import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import GuestbookPost from '../components/GuestbookPost';
import GoogleLogin from '../components/GoogleLogin';
import guestbookHero from '/src/assets/images/guestbookhero.webp'
import { useUser } from '../UserContext';
import {csrfFetch} from '../utils/csrfFetch';
import ReactMarkdown from 'react-markdown';

const GuestbookPage = ({currentUser}) => {
  const {user, isLoggedIn, loadingUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/guestbook', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch guestbook entries.");
        return res.json();
      })
      .then(data => {
        setPosts(data);
      })
      .catch(err => {
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleted = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    csrfFetch('/api/guestbook', {
      method: 'POST',
      body: JSON.stringify({ message: newMessage.trim() })
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Failed to post message");
      })
      .then(data => {
        setPosts(prev => [data, ...prev]);
        setNewMessage('');
      })
      .catch(err => alert(err.message));
  };

return (
  <div>
    <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${guestbookHero})` }}>
      <div className="px-8 py-8 flex items-center gap-8 max-w-[80ch] mx-auto relative min-h-75">
        <div className="h-full justify-center py-auto my-auto">
          <p className="p-6 bg-red-500 rounded-xl bg-stone-100/50 shadow-2xl shadow-stone-100">
            Welcome to the guestbook, where anyone can write a message for the world to see. 
            If you've made it this far, leave a comment letting everyone know what you think!
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Guestbook</h1>

      {/* Post message section */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message here... (Markdown supported)"
            className="w-full border rounded p-2 mb-2 bg-stone-100"
            rows={3}
            maxLength={1000}
            required
          />
          <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" 
          className="text-stone-800 underline hover:text-shadow-lg/15">
          Markdown cheat-sheet ↗ &#40;external&#41;</a>
          <br/>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 mt-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Post
          </button>

          {newMessage && (
          <div className="mt-4">
            <hr className="my-5"/>
            <h2 className="text-2xl font-semibold mb-4 text-stone-800">Preview</h2>
            <div className="prose py-4 text-stone-800">
              <ReactMarkdown>{newMessage}</ReactMarkdown>
            </div>
          </div>
            )}
        </form>
      ) : (
        <div className="text-center mb-6 text-gray-900 flex flex-col items-center space-y-4 pb-4">
          <p>You must be logged in to post to the guestbook.</p>
          <div className= "p-2 bg-slate-700 rounded-xl shadow-xl/35 hover:scale-[1.05] transition-transform duration-200">
            <GoogleLogin textColor="white" bgColor="red" googleBg="slate-700" forceText = {true} />
          </div>
        </div>
      )}
      <div className="flex items-center justify-center pb-6">
        <hr className="w-full"/>
      </div>

      {/* Guestbook entries */}
      <div className="">
        {loading ? (
          <Spinner loading={true} />
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-700">No guestbook entries yet. Be the first to post!</p>
        ) : (
          posts.map((post) => <GuestbookPost key={post.id} post={post} onDeleted={handleDeleted} currentUser={currentUser}/>)
        )}
      </div>
    </div>
  </div>
);
}

export default GuestbookPage
