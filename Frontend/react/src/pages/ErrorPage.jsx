const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-6">
        An unexpected error occurred. Try refreshing the page, or returning to the home page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Refresh
      </button>
      <br/>
      <Link to="/blog" onClick={() => {if(onMobile){setOpen(false)}}} className={"block text-stone-800 max-lg:indent-[10%] text-left underline max-lg:hover:shadow-lg max-lg:py-4 w-full h-full " +
        "lg:rounded-lg lg:hover:text-shadow-lg lg:py-2"
      }>
        ← Return to blog home
      </Link>
    </div>
  );
};

export default ErrorPage;