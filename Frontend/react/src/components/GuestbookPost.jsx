import GuestbookDeleteButton from "./GuestbookDeleteButton";
import ReactMarkdown from 'react-markdown';

const GuestbookPost = ({ post, onDeleted}) => {
  function getDisplayName(fullName) {
    if (!fullName) {
      return "Anonymous";
    }
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0];
    }
    return `${parts[0]} ${parts[1][0]}.`;
  }
  return (
    <div className="">
      <div className="text-sm text-gray-700 pb-1">
          {getDisplayName(post.user.name)} on {new Date(post.dateCreated).toLocaleString([], {year: 'numeric', month: 'numeric', 
            day: 'numeric', hour: '2-digit', minute: '2-digit'})}
      </div>
      <div className="mb-2 prose">
        <ReactMarkdown>
            {post.message.replace(/^"(.*)"$/, '$1')}
        </ReactMarkdown>
      </div>
      <div>
        <GuestbookDeleteButton entryId={post.id} entryUserEmail={post.user.email} 
          onDeleted={onDeleted}/>
      </div>
      <div className="flex items-center justify-center py-6">
        <hr className="w-full"/>
      </div>
    </div>
  )
}

export default GuestbookPost
