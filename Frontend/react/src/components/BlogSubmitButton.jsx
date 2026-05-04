const BlogSubmitButton = ({ submitting }) => {
  return (
    <button
      type="submit"
      disabled={submitting}
      className={`px-4 py-2 rounded text-white ${
        submitting ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {submitting ? 'Posting...' : 'Publish Post'}
    </button>
  );
};

export default BlogSubmitButton;