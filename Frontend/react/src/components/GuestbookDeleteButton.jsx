import { useUser } from '../UserContext';
import {csrfFetch} from '../utils/csrfFetch';

const GuestbookDeleteButton = ({ entryId, entryUserEmail, onDeleted }) => {
    const { user, isLoggedIn } = useUser();

    const isAuthor = isLoggedIn && user?.email === entryUserEmail;
    const isAnAdmin = isLoggedIn && user?.isAdmin;

    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

    csrfFetch(`/api/guestbook/${entryId}/delete`, {
        method: "PUT",
        credentials: "include"
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to delete");
        onDeleted(entryId);
    })
    .catch(err => alert(err.message));
    };

    if (!isAuthor && !isAnAdmin) return null;

    return (
        <button
            onClick={handleDelete}
            className="text-white hover:bg-red-700 text-sm bg-red-600 border border-red-900 rounded-md px-2 py-1"
        >
            Delete
        </button>
    );
};

export default GuestbookDeleteButton
